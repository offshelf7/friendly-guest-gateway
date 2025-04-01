
-- Create user roles enum type
CREATE TYPE public.user_role AS ENUM (
  'guest', 
  'staff', 
  'admin', 
  'general_manager', 
  'operational_manager'
);

-- Add role column to existing users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'guest';
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS suspended BOOLEAN DEFAULT false;

-- Create admin_messages table for admin communication
CREATE TABLE IF NOT EXISTS public.admin_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL,
  to_user_id UUID NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service_categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table that references categories
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.service_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  duration INTEGER, -- in minutes
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default service categories
INSERT INTO public.service_categories (name, description, icon) VALUES
('Room Service', 'In-room dining and amenities', 'utensils'),
('Housekeeping', 'Room cleaning and maintenance', 'brush'),
('Spa & Wellness', 'Massage and wellness treatments', 'heart'),
('Concierge', 'Assistance with reservations and information', 'user'),
('Recreation', 'Fitness center, swimming pool, and other recreational activities', 'user')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_messages
CREATE POLICY "Users can view messages where they are sender or recipient" 
ON public.admin_messages FOR SELECT 
USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can send messages" 
ON public.admin_messages FOR INSERT 
WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can mark messages as read if they are recipient" 
ON public.admin_messages FOR UPDATE 
USING (auth.uid() = to_user_id);

-- RLS Policies for service_categories
CREATE POLICY "Anyone can view service categories" 
ON public.service_categories FOR SELECT USING (true);

CREATE POLICY "Staff and above can insert service categories" 
ON public.service_categories FOR INSERT 
WITH CHECK (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

CREATE POLICY "Staff and above can update service categories" 
ON public.service_categories FOR UPDATE 
USING (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

CREATE POLICY "Staff and above can delete service categories" 
ON public.service_categories FOR DELETE 
USING (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

-- RLS Policies for services
CREATE POLICY "Anyone can view services" 
ON public.services FOR SELECT USING (true);

CREATE POLICY "Staff and above can insert services" 
ON public.services FOR INSERT 
WITH CHECK (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

CREATE POLICY "Staff and above can update services" 
ON public.services FOR UPDATE 
USING (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

CREATE POLICY "Staff and above can delete services" 
ON public.services FOR DELETE 
USING (auth.jwt() ->> 'role' IN ('staff', 'admin', 'general_manager', 'operational_manager'));

-- Create function to set user role
CREATE OR REPLACE FUNCTION public.set_user_role(user_id_param UUID, role_param user_role)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.users
  SET role = role_param
  WHERE id = user_id_param;
END;
$$;
