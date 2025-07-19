-- Add username field to profiles and make it unique
ALTER TABLE public.profiles 
ADD COLUMN username TEXT UNIQUE;

-- Update the handle_new_user function to set admin role for specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, username, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Anonymous User'),
    COALESCE(NEW.raw_user_meta_data->>'username', LOWER(SPLIT_PART(NEW.email, '@', 1))),
    CASE 
      WHEN NEW.email = 'dhiyanesh@admin.com' THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$function$;

-- Update existing admin user role
UPDATE public.profiles 
SET role = 'admin', username = 'dhiyanesh_admin'
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'dhiyanesh@admin.com'
);

-- Add username to existing profiles if not set
UPDATE public.profiles 
SET username = LOWER(SPLIT_PART((SELECT email FROM auth.users WHERE id = user_id), '@', 1)) || '_' || EXTRACT(epoch FROM created_at)::text
WHERE username IS NULL;