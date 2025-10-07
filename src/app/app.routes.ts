import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Importar componentes
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GamesListComponent } from './features/games/games-list/games-list.component';
import { GameAddComponent } from './features/games/game-add/game-add.component';
import { ProfileComponent } from './features/profile/profile/profile.component';

export const routes: Routes = [
  // Ruta raíz - redirige a games
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },

  // Rutas de autenticación (públicas)
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión - Tienda Juegos'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro - Tienda Juegos'
  },

  // Rutas de juegos
  {
    path: 'games',
    component: GamesListComponent,
    title: 'Videojuegos - Tienda Juegos'
  },
  {
    path: 'games/add',
    component: GameAddComponent,
    canActivate: [authGuard], // Protegida - requiere autenticación
    title: 'Agregar Juego - Tienda Juegos'
  },

  // Rutas de perfil (protegida)
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Mi Perfil - Tienda Juegos'
  },

  // Ruta 404 - redirige a games
  {
    path: '**',
    redirectTo: 'games'
  }
];
