
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Type for messages
type Message = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  read: boolean;
  created_at: string;
  from_user_name?: string;
  to_user_name?: string;
};

// Schema for reply form
const replySchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Please enter a message' })
    .max(500, { message: 'Message must be less than 500 characters' }),
});

const UserMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const replyForm = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        // Fetch messages where the current user is either sender or recipient
        const { data, error } = await supabase
          .from('admin_messages')
          .select('*')
          .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Mark unread messages as read
        const unreadMessages = data
          .filter(
            (msg) => msg.to_user_id === user.id && msg.read === false
          )
          .map((msg) => msg.id);

        if (unreadMessages.length > 0) {
          await supabase
            .from('admin_messages')
            .update({ read: true })
            .in('id', unreadMessages);
        }

        // Get unique user IDs from the messages
        const userIds = Array.from(
          new Set(
            data.flatMap((msg) => [msg.from_user_id, msg.to_user_id])
          )
        );

        // Fetch user names
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, name, email')
          .in('id', userIds);

        if (userError) throw userError;

        // Create a mapping of user IDs to names
        const userMap: Record<string, string> = {};
        userData.forEach((user) => {
          userMap[user.id] = user.name || user.email;
        });

        setUsers(userMap);
        setMessages(data);
      } catch (error: any) {
        console.error('Error fetching messages:', error);
        toast({
          title: 'Error fetching messages',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('admin_messages_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_messages',
          filter: `from_user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Message change received:', payload);
          // Refresh messages
          fetchMessages();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_messages',
          filter: `to_user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Message change received:', payload);
          // Refresh messages
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  // Function to send reply
  const handleReply = async (data: z.infer<typeof replySchema>) => {
    if (!user) return;

    try {
      // Find the most recent admin who contacted this user
      const adminMessage = messages.find(
        (msg) => msg.to_user_id === user.id
      );

      if (!adminMessage) {
        toast({
          title: 'No admin to reply to',
          description:
            'Cannot find an admin to reply to. Please wait for an admin to contact you.',
          variant: 'destructive',
        });
        return;
      }

      const adminId = adminMessage.from_user_id;

      const { error } = await supabase.from('admin_messages').insert({
        from_user_id: user.id,
        to_user_id: adminId,
        message: data.message,
      });

      if (error) throw error;

      toast({
        title: 'Message sent',
        description: 'Your reply has been sent successfully.',
      });

      replyForm.reset();
    } catch (error: any) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error sending reply',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
          </CardTitle>
          <CardDescription>
            Your communication with administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>You have no messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => {
                const isFromCurrentUser = message.from_user_id === user?.id;
                const fromName = users[message.from_user_id] || 'Unknown';
                const toName = users[message.to_user_id] || 'Unknown';

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isFromCurrentUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[80%] ${
                        isFromCurrentUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">
                          {isFromCurrentUser ? 'You' : fromName}
                        </span>
                        <span className="text-xs opacity-70">
                          {formatDistanceToNow(
                            new Date(message.created_at),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap break-words">
                        {message.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <form
            onSubmit={replyForm.handleSubmit(handleReply)}
            className="w-full"
          >
            <div className="flex space-x-2">
              <Textarea
                placeholder="Type your reply here..."
                className="flex-1"
                {...replyForm.register('message')}
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {replyForm.formState.errors.message && (
              <p className="text-destructive text-sm mt-1">
                {replyForm.formState.errors.message.message}
              </p>
            )}
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserMessages;
