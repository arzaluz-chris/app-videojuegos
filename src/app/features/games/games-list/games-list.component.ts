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
   * Generar array de estrellas basado en rating (0-5)
   */
  getRatingStars(game: Game): number[] {
    const rating = Math.round(game.rating);
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  /**
   * Trackby function para mejorar performance del ngFor
   */
  trackByGameId(index: number, game: Game): string | undefined {
    return game.id;
  }
}
