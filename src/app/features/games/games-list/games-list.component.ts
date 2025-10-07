import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../../../core/services/games.service';
import { AuthService } from '../../../core/services/auth.service';
import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit {
  games$!: Observable<Game[]>;
  isAuthenticated$!: Observable<boolean>;
  isLoading: boolean = false;

  constructor(
    private gamesService: GamesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  /**
   * Obtener badge de color según el rating
   */
  getRatingClass(rating?: number): string {
    if (!rating) return 'rating-default';
    if (rating >= 90) return 'rating-excellent';
    if (rating >= 80) return 'rating-good';
    if (rating >= 70) return 'rating-average';
    return 'rating-low';
  }

  /**
   * Formatear precio en formato de moneda
   */
  formatPrice(price?: number): string {
    if (!price) return 'Gratis';
    return `$${price.toFixed(2)}`;
  }

  /**
   * Trackby function para mejorar performance del ngFor
   */
  trackByGameId(index: number, game: Game): string {
    return game.id;
  }
}
