-- Update the user kevin@colombiaedtech.org to administrator role
-- First, let's find the user and update their role
UPDATE public.user_roles 
SET role = 'administrador'
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'kevin@colombiaedtech.org'
);

-- If the user doesn't have a role record yet, insert one
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'administrador'::app_role
FROM auth.users 
WHERE email = 'kevin@colombiaedtech.org'
AND id NOT IN (SELECT user_id FROM public.user_roles);

-- Verify both administrators are set correctly
SELECT 
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'administrador'
ORDER BY u.email;