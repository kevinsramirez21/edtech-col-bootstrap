import { useState } from 'react';
import { User, LogOut, Settings, Shield, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

export function UserMenu() {
  const { user, profile, role, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  if (!user) return null;

  const getInitials = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || 'U';
  };

  const getRoleBadge = () => {
    const roleColors = {
      administrador: 'bg-red-100 text-red-800 border-red-200',
      asociado: 'bg-blue-100 text-blue-800 border-blue-200',
      visitante: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const roleLabels = {
      administrador: 'Admin',
      asociado: 'Asociado',
      visitante: 'Visitante',
    };

    return (
      <Badge 
        variant="outline" 
        className={roleColors[role as keyof typeof roleColors] || roleColors.visitante}
      >
        {roleLabels[role as keyof typeof roleLabels] || 'Visitante'}
      </Badge>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={profile?.avatar_url || ''} 
              alt={profile?.first_name || user.email || 'Usuario'} 
            />
            <AvatarFallback className="bg-primary-100 text-primary-800 font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name} ${profile.last_name}`
                  : user.email}
              </p>
              {getRoleBadge()}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {profile?.organization && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building className="h-3 w-3" />
                {profile.organization}
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Mi Perfil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        
        {role === 'administrador' && (
          <DropdownMenuItem onClick={handleAdminClick}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Panel Admin</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={isLoading}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? 'Cerrando...' : 'Cerrar Sesión'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}