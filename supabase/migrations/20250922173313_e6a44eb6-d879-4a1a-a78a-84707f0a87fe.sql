-- Update the user haroldcombita@gmail.com to administrator role
-- First, let's find the user and update their role
UPDATE public.user_roles 
SET role = 'administrador'
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'haroldcombita@gmail.com'
);

-- If the user doesn't have a role record yet, insert one
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'administrador'::app_role
FROM auth.users 
WHERE email = 'haroldcombita@gmail.com'
AND id NOT IN (SELECT user_id FROM public.user_roles);

-- Verify the role was set correctly by selecting the user's role
-- (This is just for verification, the actual data will be returned)