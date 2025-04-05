
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/home/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(values);
      toast({
        title: t('contact.messageSent'),
        description: t('contact.responseMessage'),
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: t('contact.address'),
      details: ["123 Luxury Avenue", "New York, NY 10001", "United States"]
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: t('contact.phone'),
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: t('contact.email'),
      details: ["info@luxuryhotels.com", "reservations@luxuryhotels.com"]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t('contact.hours'),
      details: ["Check-in: 3:00 PM", "Check-out: 12:00 PM", "Front Desk: 24/7"]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[350px] bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{t('contact.getInTouch')}</h2>
            <p className="text-slate-600">
              {t('contact.getInTouchText')}
            </p>
            
            <div className="space-y-6 mt-8">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">{t('contact.sendMessage')}</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.name')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('contact.yourName')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.email')}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t('contact.yourEmail')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.subject')}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('contact.selectSubject')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="reservation">{t('contact.reservation')}</SelectItem>
                              <SelectItem value="services">{t('contact.services')}</SelectItem>
                              <SelectItem value="feedback">{t('contact.feedback')}</SelectItem>
                              <SelectItem value="complaint">{t('contact.complaint')}</SelectItem>
                              <SelectItem value="other">{t('contact.other')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('contact.yourMessage')} 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('contact.sending') : t('contact.send')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-[400px] mt-8 bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.662137906387!2d-73.9852652!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1651266374661!5m2!1sen!2sus"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Hotel Location"
        ></iframe>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
