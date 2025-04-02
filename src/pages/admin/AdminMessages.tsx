
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Trash2, 
  RefreshCw,
  Send
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface AdminMessage {
  id: string;
  message: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
  read: boolean;
  from_user?: {
    name: string;
    email: string;
  };
  to_user?: {
    name: string;
    email: string;
  };
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const { toast } = useToast();

  // Create a form schema for new messages
  const messageSchema = z.object({
    to_user_id: z.string().uuid({
      message: "Please select a valid recipient"
    }),
    message: z.string().min(1, {
      message: "Message cannot be empty"
    })
  });

  // Create a form for the new message
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      to_user_id: "",
      message: ""
    }
  });

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_messages')
        .select(`
          *,
          from_user:from_user_id(name, email),
          to_user:to_user_id(name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data as AdminMessage[]);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(message => message.id !== id));
      toast({
        title: 'Success',
        description: 'Message deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };

  // Mark a message as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(message => 
        message.id === id ? { ...message, read: true } : message
      ));
    } catch (error: any) {
      console.error('Error marking message as read:', error);
    }
  };

  // Send a new message
  const sendMessage = async (data: z.infer<typeof messageSchema>) => {
    try {
      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!userData.user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to send messages',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('admin_messages')
        .insert({
          from_user_id: userData.user.id,
          to_user_id: data.to_user_id,
          message: data.message,
          read: false
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
      form.reset();
      fetchMessages();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  // Load messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Messages</h1>
          <p className="text-muted-foreground">Manage internal communications</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchMessages} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message</DialogTitle>
                <DialogDescription>
                  Send a message to another staff member
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(sendMessage)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="to_user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="User ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>View all admin communications</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading messages...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <TableRow 
                      key={message.id}
                      className={`${!message.read ? 'bg-muted/50' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) markAsRead(message.id);
                      }}
                    >
                      <TableCell>
                        {message.from_user?.name || message.from_user?.email || message.from_user_id}
                      </TableCell>
                      <TableCell>
                        {message.to_user?.name || message.to_user?.email || message.to_user_id}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{message.message}</div>
                      </TableCell>
                      <TableCell>{formatDate(message.created_at)}</TableCell>
                      <TableCell>
                        {message.read ? (
                          <Badge variant="outline">Read</Badge>
                        ) : (
                          <Badge>New</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No messages found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">From:</p>
                <p>{selectedMessage.from_user?.name || selectedMessage.from_user?.email || selectedMessage.from_user_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">To:</p>
                <p>{selectedMessage.to_user?.name || selectedMessage.to_user?.email || selectedMessage.to_user_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date:</p>
                <p>{formatDate(selectedMessage.created_at)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Message:</p>
                <div className="p-3 bg-muted rounded-md mt-1">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={() => {
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminMessages;
