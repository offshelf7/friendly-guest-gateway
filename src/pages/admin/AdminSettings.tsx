
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Mail,
  Bell,
  Globe,
  Shield,
  CreditCard,
  User,
  Building,
  Phone,
  MapPin,
  Clock,
  Brush,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schemas for each settings section
const generalFormSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").or(z.string().length(0)),
  timezone: z.string().min(1, "Timezone is required"),
});

const emailFormSchema = z.object({
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.coerce.number().int().positive("Port must be a positive integer"),
  smtpUsername: z.string().min(1, "SMTP username is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  fromEmail: z.string().email("Invalid email address"),
  replyToEmail: z.string().email("Invalid email address"),
  enableSsl: z.boolean(),
});

const notificationFormSchema = z.object({
  bookingNotifications: z.boolean(),
  bookingCancellations: z.boolean(),
  guestMessages: z.boolean(),
  paymentNotifications: z.boolean(),
  systemAlerts: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

const paymentFormSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  taxRate: z.coerce.number().min(0, "Tax rate cannot be negative"),
  stripePublicKey: z.string().min(1, "Stripe public key is required"),
  stripeSecretKey: z.string().min(1, "Stripe secret key is required"),
  enablePaypal: z.boolean(),
  paypalClientId: z.string().optional(),
  paypalSecret: z.string().optional(),
});

const privacyFormSchema = z.object({
  privacyPolicy: z.string().min(1, "Privacy policy is required"),
  termsOfService: z.string().min(1, "Terms of service is required"),
  dataRetentionDays: z.coerce.number().int().positive("Must be a positive integer"),
  automaticDeletion: z.boolean(),
  gdprCompliance: z.boolean(),
});

const appearanceFormSchema = z.object({
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
  logoUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  faviconUrl: z.string().url("Invalid URL").or(z.string().length(0)),
  enableDarkMode: z.boolean(),
  customCss: z.string().optional(),
});

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  // Forms for each settings section
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      hotelName: "Luxury Hotel & Resort",
      address: "123 Main Street",
      city: "Anytown",
      state: "State",
      postalCode: "12345",
      country: "United States",
      phone: "+1 (555) 123-4567",
      email: "info@luxuryhotel.com",
      website: "https://luxuryhotel.com",
      timezone: "America/New_York",
    },
  });
  
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      smtpServer: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "user@example.com",
      smtpPassword: "password",
      fromEmail: "noreply@luxuryhotel.com",
      replyToEmail: "support@luxuryhotel.com",
      enableSsl: true,
    },
  });
  
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      bookingNotifications: true,
      bookingCancellations: true,
      guestMessages: true,
      paymentNotifications: true,
      systemAlerts: true,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: false,
    },
  });
  
  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      currency: "USD",
      taxRate: 7.5,
      stripePublicKey: "pk_test_example",
      stripeSecretKey: "sk_test_example",
      enablePaypal: false,
      paypalClientId: "",
      paypalSecret: "",
    },
  });
  
  const privacyForm = useForm<z.infer<typeof privacyFormSchema>>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      privacyPolicy: "Our standard privacy policy...",
      termsOfService: "Standard terms of service...",
      dataRetentionDays: 365,
      automaticDeletion: false,
      gdprCompliance: true,
    },
  });
  
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      primaryColor: "#f59e0b",
      secondaryColor: "#0f172a",
      logoUrl: "",
      faviconUrl: "",
      enableDarkMode: true,
      customCss: "",
    },
  });

  // Generic save handler for all forms
  const handleSaveSettings = (data: any) => {
    console.log("Saving settings:", activeTab, data);
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure your hotel management system settings
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="w-full border-b pb-0 bg-transparent h-auto">
          <div className="flex overflow-x-auto space-x-4 pb-0">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Brush className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </div>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your hotel's basic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  id="general-form"
                  onSubmit={generalForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hotel Information</h3>
                    <FormField
                      control={generalForm.control}
                      name="hotelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hotel Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={generalForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={generalForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address</h3>
                    <FormField
                      control={generalForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={generalForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={generalForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="Europe/London">GMT (UTC+0)</SelectItem>
                                <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="general-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings for sending notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  id="email-form"
                  onSubmit={emailForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SMTP Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={emailForm.control}
                        name="smtpServer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Server</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailForm.control}
                        name="smtpPort"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Port</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={emailForm.control}
                        name="smtpUsername"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailForm.control}
                        name="smtpPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={emailForm.control}
                      name="enableSsl"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Use SSL/TLS</FormLabel>
                            <FormDescription>
                              Enable secure connection for email transmission
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Addresses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={emailForm.control}
                        name="fromEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormDescription>
                              The email address that will appear as the sender
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailForm.control}
                        name="replyToEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reply-To Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormDescription>
                              Email address that receives replies
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="email-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  id="notification-form"
                  onSubmit={notificationForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Events</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select which events should trigger notifications
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="bookingNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>New Bookings</FormLabel>
                              <FormDescription>
                                Get notified when a new booking is made
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="bookingCancellations"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Booking Cancellations</FormLabel>
                              <FormDescription>
                                Get notified when a booking is cancelled
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="guestMessages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Guest Messages</FormLabel>
                              <FormDescription>
                                Get notified when guests send messages
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="paymentNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Payment Events</FormLabel>
                              <FormDescription>
                                Get notified about payment successes and failures
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="systemAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>System Alerts</FormLabel>
                              <FormDescription>
                                Get notified about system errors and warnings
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose how notifications are delivered
                    </p>

                    <div className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Email Notifications</FormLabel>
                              <FormDescription>
                                Send notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="smsNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>SMS Notifications</FormLabel>
                              <FormDescription>
                                Send notifications via SMS (requires configuration)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Push Notifications</FormLabel>
                              <FormDescription>
                                Send push notifications to mobile devices
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="notification-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form
                  id="payment-form"
                  onSubmit={paymentForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={paymentForm.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Currency</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="taxRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Rate (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormDescription>
                              Default tax rate applied to bookings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Stripe Integration</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={paymentForm.control}
                        name="stripePublicKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Public Key</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={paymentForm.control}
                        name="stripeSecretKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stripe Secret Key</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" />
                            </FormControl>
                            <FormDescription>
                              Never share your secret key
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <FormField
                      control={paymentForm.control}
                      name="enablePaypal"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Enable PayPal</FormLabel>
                            <FormDescription>
                              Allow customers to pay with PayPal
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {paymentForm.watch("enablePaypal") && (
                      <div className="grid grid-cols-1 gap-4 p-4 border rounded-md bg-muted/30">
                        <FormField
                          control={paymentForm.control}
                          name="paypalClientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Client ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={paymentForm.control}
                          name="paypalSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Secret</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="payment-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Configure privacy and data protection settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...privacyForm}>
                <form
                  id="privacy-form"
                  onSubmit={privacyForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Legal Documents</h3>
                    <FormField
                      control={privacyForm.control}
                      name="privacyPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Privacy Policy</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              className="min-h-[150px]"
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed to users on the privacy policy page
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={privacyForm.control}
                      name="termsOfService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Terms of Service</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              className="min-h-[150px]"
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed to users on the terms of service page
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Retention</h3>
                    <FormField
                      control={privacyForm.control}
                      name="dataRetentionDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Retention Period (days)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormDescription>
                            How long to keep user data after checkout
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={privacyForm.control}
                      name="automaticDeletion"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Automatic Data Deletion</FormLabel>
                            <FormDescription>
                              Automatically delete user data after the retention period
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={privacyForm.control}
                      name="gdprCompliance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>GDPR Compliance</FormLabel>
                            <FormDescription>
                              Enable features for GDPR compliance (right to be forgotten, data export)
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="privacy-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form
                  id="appearance-form"
                  onSubmit={appearanceForm.handleSubmit((data) =>
                    handleSaveSettings(data)
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={appearanceForm.control}
                        name="primaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Color</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <div
                                className="w-10 h-10 rounded-full border"
                                style={{ backgroundColor: field.value }}
                              ></div>
                            </div>
                            <FormDescription>
                              Main accent color (HEX or RGB value)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={appearanceForm.control}
                        name="secondaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Color</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <div
                                className="w-10 h-10 rounded-full border"
                                style={{ backgroundColor: field.value }}
                              ></div>
                            </div>
                            <FormDescription>
                              Secondary color (HEX or RGB value)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Branding</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={appearanceForm.control}
                        name="logoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://example.com/logo.png" />
                            </FormControl>
                            <FormDescription>
                              URL to your hotel logo image
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={appearanceForm.control}
                        name="faviconUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Favicon URL</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="https://example.com/favicon.ico" />
                            </FormControl>
                            <FormDescription>
                              URL to your website favicon
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <FormField
                      control={appearanceForm.control}
                      name="enableDarkMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Dark Mode Support</FormLabel>
                            <FormDescription>
                              Enable dark mode option for users
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="customCss"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom CSS</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder=".custom-class { color: blue; }"
                              className="font-mono text-sm"
                            />
                          </FormControl>
                          <FormDescription>
                            Custom CSS to be applied to the site
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                form="appearance-form"
                type="submit"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
