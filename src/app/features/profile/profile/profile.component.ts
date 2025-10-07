import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /**
   * Cargar información del usuario actual
   */
  private loadUserProfile(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error al cargar el perfil:', error);
      }
    });
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  /**
   * Obtener iniciales del usuario para avatar
   */
  getUserInitials(): string {
    if (!this.user?.name) return 'U';

    const names = this.user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }

    return this.user.name.substring(0, 2).toUpperCase();
  }

  /**
   * Obtener color de avatar basado en el nombre
   */
  getAvatarColor(): string {
    if (!this.user?.name) return '#667eea';

    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#4facfe',
      '#43e97b', '#fa709a', '#30cfd0', '#a8edea'
    ];

    const index = this.user.name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
