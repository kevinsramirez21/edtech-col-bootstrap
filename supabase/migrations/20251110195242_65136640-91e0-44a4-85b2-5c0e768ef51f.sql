-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  subscribed boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Only admins can view subscriptions
CREATE POLICY "Admins can view all subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (has_role(auth.uid(), 'administrador'::app_role));

-- Only admins can update subscriptions
CREATE POLICY "Admins can update subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
USING (has_role(auth.uid(), 'administrador'::app_role));

-- Only admins can delete subscriptions
CREATE POLICY "Admins can delete subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
USING (has_role(auth.uid(), 'administrador'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();