import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserRole, ROLE_DISPLAY_NAMES } from '@/types/roleTypes';
import { UserData } from '@/types/adminTypes';

import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  UserMinus,
  MessageSquare,
  UserCheck,
  UserCog,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface MockUser {
  id: string;
  email: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const { toast } = useToast();
  
  const mockAuthData = {
    user: { id: 'mock-admin-id', email: 'admin@example.com' } as MockUser,
    signOut: async () => { console.log('Mock sign out'); },
    userRoles: ['admin'],
    userSuspended: false,
    session: null,
    loading: false,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
  };
  
  const [currentUser, setCurrentUser] = useState<MockUser>(mockAuthData.user);
  
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { useAuth } = await import('@/contexts/AuthContext');
        try {
          const auth = useAuth();
          if (auth.user) {
            setCurrentUser(auth.user as MockUser);
          }
        } catch (e) {
          console.log('AuthProvider not available, using mock data');
        }
      } catch (e) {
        console.log('Failed to import AuthContext, using mock data');
      }
    };
    
    fetchAuthUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedUsers: UserData[] = (data || []).map(user => ({
          id: user.id,
          email: user.email || '',
          name: user.name,
          role: user.role as UserRole | UserRole[] | null,
          created_at: user.created_at,
          suspended: user.suspended || false
        }));

        setUsers(formattedUsers);
      } catch (error: any) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error fetching users',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const updateUserRole = async (userId: string, roles: UserRole[]) => {
    try {
      const roleValue = roles.length === 1 ? roles[0] : roles;
      
      const { error } = await supabase
        .from('users')
        .update({ role: roleValue as any })
        .eq('id', userId);

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: roles } : user
        )
      );

      toast({
        title: 'Role updated',
        description: 'User roles have been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: 'Error updating role',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleSuspension = async (userId: string, suspend: boolean) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ suspended: suspend })
        .eq('id', userId);

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, suspended: suspend } : user
        )
      );

      toast({
        title: suspend ? 'User suspended' : 'User unsuspended',
        description: `User has been ${
          suspend ? 'suspended' : 'unsuspended'
        } successfully.`,
      });
    } catch (error: any) {
      console.error('Error toggling suspension:', error);
      toast({
        title: 'Error updating user',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const newUserSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    name: z.string().min(1, { message: 'Please enter a name' }),
    roles: z.array(z.string()).min(1, { message: 'Select at least one role' }),
  });

  const messageSchema = z.object({
    message: z
      .string()
      .min(1, { message: 'Please enter a message' })
      .max(500, { message: 'Message must be less than 500 characters' }),
  });

  const newUserForm = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      roles: ['guest'],
    },
  });

  const messageForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const createUser = async (data: z.infer<typeof newUserSchema>) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('User creation failed');
      }

      const rolesArray = data.roles as unknown as UserRole[];
      setTimeout(async () => {
        const roleValue = rolesArray.length === 1 ? rolesArray[0] : rolesArray;
        
        const { error: roleError } = await supabase
          .from('users')
          .update({ 
            role: roleValue as any
          })
          .eq('id', authData.user!.id);

        if (roleError) {
          console.error('Error setting user role:', roleError);
          toast({
            title: 'Error setting user role',
            description: roleError.message,
            variant: 'destructive',
          });
        }

        const { data: updatedUsers, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (!fetchError && updatedUsers) {
          const formattedUsers: UserData[] = updatedUsers.map(user => ({
            id: user.id,
            email: user.email || '',
            name: user.name,
            role: user.role as UserRole | UserRole[] | null,
            created_at: user.created_at,
            suspended: user.suspended || false
          }));
          
          setUsers(formattedUsers);
        }
      }, 1000);

      toast({
        title: 'User created',
        description: 'New user has been created successfully.',
      });

      newUserForm.reset();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error creating user',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const sendMessage = async (data: z.infer<typeof messageSchema>) => {
    if (!selectedUser || !currentUser) return;

    try {
      const { error } = await supabase.from('admin_messages').insert({
        from_user_id: currentUser.id,
        to_user_id: selectedUser.id,
        message: data.message,
      }) as { error: any };

      if (error) throw error;

      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });

      messageForm.reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const availableRoles = Object.keys(ROLE_DISPLAY_NAMES) as UserRole[];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with specific roles.
              </DialogDescription>
            </DialogHeader>

            <Form {...newUserForm}>
              <form
                onSubmit={newUserForm.handleSubmit(createUser)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={newUserForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={newUserForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={newUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={newUserForm.control}
                  name="roles"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Roles</FormLabel>
                        <FormDescription>
                          Select the roles for this user
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {availableRoles.map((role) => (
                          <FormField
                            key={role}
                            control={newUserForm.control}
                            name="roles"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={role}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(role)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              role,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== role
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {ROLE_DISPLAY_NAMES[role as UserRole]}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <Table>
            <TableCaption>List of all users in the system</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name || 'N/A'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(user.role)
                        ? user.role.map((r) => (
                            <Badge key={r} variant="outline">
                              {ROLE_DISPLAY_NAMES[r]}
                            </Badge>
                          ))
                        : user.role && (
                            <Badge variant="outline">
                              {ROLE_DISPLAY_NAMES[user.role]}
                            </Badge>
                          )}
                      {!user.role && (
                        <Badge variant="outline">No Role</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.suspended ? (
                      <Badge variant="destructive">Suspended</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User Roles</DialogTitle>
                            <DialogDescription>
                              Update roles for {user.name || user.email}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <h3 className="mb-2 font-medium">Assign Roles</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {availableRoles.map((role) => {
                                const userRoles = Array.isArray(user.role)
                                  ? user.role
                                  : user.role
                                  ? [user.role]
                                  : [];
                                const isChecked = userRoles.includes(role);

                                return (
                                  <div
                                    key={role}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`role-${role}`}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        if (!selectedUser) return;
                                        const currentRoles = Array.isArray(
                                          selectedUser.role
                                        )
                                          ? [...selectedUser.role]
                                          : selectedUser.role
                                          ? [selectedUser.role]
                                          : [];

                                        let newRoles: UserRole[];
                                        if (checked) {
                                          newRoles = [
                                            ...currentRoles,
                                            role as UserRole,
                                          ];
                                        } else {
                                          newRoles = currentRoles.filter(
                                            (r) => r !== role
                                          );
                                        }
                                        setSelectedUser({
                                          ...selectedUser,
                                          role: newRoles,
                                        });
                                      }}
                                    />
                                    <label
                                      htmlFor={`role-${role}`}
                                      className="text-sm cursor-pointer"
                                    >
                                      {ROLE_DISPLAY_NAMES[role as UserRole]}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                if (selectedUser) {
                                  const roles = Array.isArray(selectedUser.role)
                                    ? selectedUser.role
                                    : selectedUser.role
                                    ? [selectedUser.role]
                                    : [];
                                  updateUserRole(selectedUser.id, roles);
                                }
                              }}
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Send Message</SheetTitle>
                            <SheetDescription>
                              Send a message to {user.name || user.email}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-4">
                            <Form {...messageForm}>
                              <form
                                onSubmit={messageForm.handleSubmit(sendMessage)}
                                className="space-y-4"
                              >
                                <FormField
                                  control={messageForm.control}
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
                                <Button type="submit" className="w-full">
                                  Send Message
                                </Button>
                              </form>
                            </Form>
                          </div>
                        </SheetContent>
                      </Sheet>

                      <Button
                        size="sm"
                        variant={user.suspended ? 'outline' : 'destructive'}
                        onClick={() =>
                          toggleSuspension(user.id, !user.suspended)
                        }
                      >
                        {user.suspended ? (
                          <UserCheck className="h-4 w-4" />
                        ) : (
                          <UserMinus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
