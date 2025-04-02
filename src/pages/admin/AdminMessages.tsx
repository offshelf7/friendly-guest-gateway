
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminMessage } from "@/types/adminTypes";
import { format } from "date-fns";
import {
  Check,
  MessageSquare,
  RefreshCcw,
  Search,
  Trash,
  X,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminMessages = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  
  const { toast } = useToast();

  // Load messages from the database
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("admin_messages")
        .select(`
          *,
          from_user:from_user_id(name,email),
          to_user:to_user_id(name,email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Cast the data to the correct type
      const formattedMessages = (data || []).map(msg => ({
        ...msg,
        from_user: {
          name: msg.from_user?.name || 'Unknown',
          email: msg.from_user?.email || 'unknown@example.com'
        },
        to_user: {
          name: msg.to_user?.name || 'Unknown',
          email: msg.to_user?.email || 'unknown@example.com'
        }
      })) as AdminMessage[];

      setMessages(formattedMessages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Mark message as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("admin_messages")
        .update({ read: true })
        .eq("id", id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));

      toast({
        title: "Message marked as read",
        description: "The message has been marked as read successfully.",
      });
    } catch (error: any) {
      console.error("Error marking message as read:", error);
      toast({
        title: "Error updating message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("admin_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== id));
      setSelectedMessage(null);

      toast({
        title: "Message deleted",
        description: "The message has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error deleting message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Send reply
  const sendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      const { error } = await supabase.from("admin_messages").insert({
        from_user_id: selectedMessage.to_user_id, // Sending as the recipient (admin)
        to_user_id: selectedMessage.from_user_id, // Sending to the original sender
        message: replyText,
      });

      if (error) throw error;

      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      });

      setReplyText("");
      fetchMessages(); // Refresh messages to include the new reply
    } catch (error: any) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error sending reply",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter messages based on search term and filter status
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.from_user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.from_user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "read") return matchesSearch && msg.read;
    if (filterStatus === "unread") return matchesSearch && !msg.read;
    
    return matchesSearch;
  });

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Message Management</CardTitle>
              <CardDescription>
                View and respond to messages from users
              </CardDescription>
            </div>
            <Button onClick={fetchMessages} variant="outline" size="sm">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as "all" | "read" | "unread")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No messages found</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableCaption>List of user messages</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className={!message.read ? "bg-muted/20" : ""}>
                      <TableCell>
                        <div className="font-medium">{message.from_user.name}</div>
                        <div className="text-sm text-muted-foreground">{message.from_user.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {message.message.substring(0, 100)}
                          {message.message.length > 100 && "..."}
                        </div>
                      </TableCell>
                      <TableCell>
                        {message.created_at ? format(new Date(message.created_at), "PPp") : "N/A"}
                      </TableCell>
                      <TableCell>
                        {message.read ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">Read</Badge>
                        ) : (
                          <Badge variant="secondary">Unread</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedMessage(message);
                              if (!message.read) {
                                markAsRead(message.id);
                              }
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {!message.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(message.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription>
                From: {selectedMessage.from_user.name} ({selectedMessage.from_user.email})
              </DialogDescription>
            </DialogHeader>
            
            <div className="border rounded-md p-4 bg-muted/50 my-4">
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              <div className="text-sm text-muted-foreground mt-2">
                {selectedMessage.created_at
                  ? format(new Date(selectedMessage.created_at), "PPp")
                  : "N/A"}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Reply</h4>
              <Textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-[100px]"
              />
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </DialogClose>
              <Button onClick={sendReply} disabled={!replyText.trim()}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminMessages;
