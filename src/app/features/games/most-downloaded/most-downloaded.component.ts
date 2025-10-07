import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Game } from '../../../shared/models/game.model';
import { GamesService } from '../../../core/services/games.service';
import { GameCardComponent } from '../../../shared/components/game-card/game-card.component';
import { MenuComponent } from '../../../shared/components/menu/menu.component';

@Component({
  selector: 'app-most-downloaded',
  standalone: true,
  imports: [CommonModule, GameCardComponent, MenuComponent],
  templateUrl: './most-downloaded.component.html',
  styleUrl: './most-downloaded.component.scss'
})
export class MostDownloadedComponent implements OnInit {
  games$!: Observable<Game[]>;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.games$ = this.gamesService.getMostDownloaded();
  }
}
