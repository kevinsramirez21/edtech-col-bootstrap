-- Actualizar sitios web verificados para asociados que no tenían
UPDATE public.asociados SET pagina_web = 'https://www.aleph.com.co' WHERE id = 'faeb528e-3529-4b80-9e1a-5b6b61c60489';
UPDATE public.asociados SET pagina_web = 'https://biru.pro' WHERE id = '180d5eaf-bdb5-4720-a327-fab4c6bb8de3';
UPDATE public.asociados SET pagina_web = 'https://cucusa.org' WHERE id = '2091d2c2-5f2f-4271-b1aa-7679b8f72d41';
UPDATE public.asociados SET pagina_web = 'https://www.escueladidactica.com' WHERE id = '367d0ed3-993e-4043-892f-723a8d772a5f';
UPDATE public.asociados SET pagina_web = 'https://innovusbs.com' WHERE id = '1b36e9d3-cd5d-46a7-bcaf-a4776828828c';
UPDATE public.asociados SET pagina_web = 'https://www.hec-latam.com' WHERE id = '1975c7f0-d7d2-43ef-ae3f-ba89f4448176';
UPDATE public.asociados SET pagina_web = 'https://innovatelearning.com.co' WHERE id = 'b3a2a9fa-44ab-433d-9a66-1881c88f4067';
UPDATE public.asociados SET pagina_web = 'https://lateacher.com.co' WHERE id = 'c82c4b1a-dfc2-4960-a804-614656cb7dad';
UPDATE public.asociados SET pagina_web = 'https://mentex.co' WHERE id = '5e9a0046-d7a3-441e-8d28-34d3e928b939';
UPDATE public.asociados SET pagina_web = 'https://www.nusoft.com.co' WHERE id = 'c8b72a33-da98-4da1-b9fc-bc5e54df08ef';
UPDATE public.asociados SET pagina_web = 'https://www.therebelschool.co' WHERE id = 'f021e059-5b56-49f5-a896-0df00a47f735';
UPDATE public.asociados SET pagina_web = 'https://virtual.gprevive.com' WHERE id = '9c5c427e-6526-4016-96f5-a9b1baf65d4c';
UPDATE public.asociados SET pagina_web = 'https://robotschool.com.co' WHERE id = '4d3b3a0a-c55a-4309-87a2-ba4345ca9622';
UPDATE public.asociados SET pagina_web = 'https://www.cosmo.edu.co' WHERE id = 'eb0f3e34-9ea4-4d1e-a583-368ee04dd3ae';
UPDATE public.asociados SET pagina_web = 'https://studyatgenuine.com' WHERE id = 'd6393841-9250-4adc-8fdb-d346e481094b';
UPDATE public.asociados SET pagina_web = 'https://tustrabajos.co' WHERE id = '44c73d88-e2e1-4152-ae96-a3b6a0360193';
UPDATE public.asociados SET pagina_web = 'https://www.xeducation.co' WHERE id = '38d72d6b-4453-428c-8957-b0671a694493';
UPDATE public.asociados SET pagina_web = 'https://www.innovahub.co' WHERE id = '8b5d9531-4a05-4a5d-9aea-5727d8f8ccba';

-- Corregir Ignia (tenía vacío en lugar de null)
UPDATE public.asociados SET pagina_web = NULL WHERE id = '64ef656d-c3e4-4597-b91d-6a8387206638';

-- Corregir correo de Selecu-Cosmo (tenía error de dominio .c en lugar de .co)
UPDATE public.asociados SET correo_contacto = 'lorenaaviles@cosmo.edu.co' WHERE id = 'eb0f3e34-9ea4-4d1e-a583-368ee04dd3ae';

-- Agregar correo de Comfandi
UPDATE public.asociados SET correo_contacto = 'servicioalcliente@comfandi.com.co' WHERE id = '680bdf9a-5fa9-47e1-a013-584379c1c9fb';