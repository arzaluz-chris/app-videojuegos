import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() game!: Game;

  /**
   * Generar array de estrellas basado en rating (0-5)
   */
  getRatingStars(): number[] {
    const rating = Math.round(this.game.rating);
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
