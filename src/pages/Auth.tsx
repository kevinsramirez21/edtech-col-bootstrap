import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, Lock, User, Building } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await signIn(email, password);
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    await signUp(email, password, firstName, lastName);
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Colombia EdTech</title>
        <meta name="description" content="Accede a tu cuenta de Colombia EdTech y únete a la comunidad de líderes que transforman la educación en Colombia." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-primary-800">
                Bienvenido a Colombia EdTech
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                La comunidad que lidera la transformación educativa
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="signup">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Nombre"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Apellido"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          minLength={6}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mínimo 6 caracteres
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              <div className="text-center text-sm text-muted-foreground">
                <p>Al registrarte, aceptas nuestros términos y condiciones</p>
                <p className="mt-2">
                  ¿Necesitas ayuda?{' '}
                  <Link to="/contacto" className="text-accent hover:underline">
                    Contáctanos
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}