import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Importar componentes
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GamesListComponent } from './features/games/games-list/games-list.component';
import { GameAddComponent } from './features/games/game-add/game-add.component';
import { ProfileComponent } from './features/profile/profile/profile.component';
import { MostPopularComponent } from './features/games/most-popular/most-popular.component';
import { MostDownloadedComponent } from './features/games/most-downloaded/most-downloaded.component';
import { ComingSoonComponent } from './features/games/coming-soon/coming-soon.component';

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
  {
    path: 'games/most-popular',
    component: MostPopularComponent,
    title: 'Más Populares - Tienda Juegos'
  },
  {
    path: 'games/most-downloaded',
    component: MostDownloadedComponent,
    title: 'Más Descargados - Tienda Juegos'
  },
  {
    path: 'games/coming-soon',
    component: ComingSoonComponent,
    title: 'Próximamente - Tienda Juegos'
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