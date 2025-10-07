import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Game } from '../../shared/models/game.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = environment.apiUrl + '/games';
  private gamesKey = 'local_games_demo';
  private games$ = new BehaviorSubject<Game[]>(this.loadLocalGames());

  constructor(private http: HttpClient) {
    this.initializeGames();
  }

  /**
   * Cargar juegos desde localStorage
   */
  private loadLocalGames(): Game[] {
    const raw = localStorage.getItem(this.gamesKey);
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  }

  /**
   * Inicializar juegos (intenta cargar desde localStorage o usa mock data)
   */
  private initializeGames(): void {
    const localGames = this.loadLocalGames();
    if (localGames.length === 0) {
      // Si está habilitado el fetch de API, intentar obtener datos reales
      if (environment.enableAPIFetch && environment.rawgApiKey) {
        this.fetchPopularFromAPI(environment.rawgApiKey).subscribe();
      } else {
        // Si no, usar datos mock por defecto
        this.setDefaultGames();
      }
    } else {
      this.games$.next(localGames);
    }
  }

  /**
   * Establecer juegos por defecto (mock data)
   */
  private setDefaultGames(): void {
    const defaultGames: Game[] = [
      {
        id: '1',
        title: 'The Legend of Zelda: Breath of the Wild',
        description: 'Explora un vasto mundo abierto en esta aventura épica',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400',
        platform: ['Nintendo Switch', 'Wii U'],
        tags: ['Aventura', 'Acción', 'Mundo abierto'],
        rating: 97
      },
      {
        id: '2',
        title: 'Elden Ring',
        description: 'Un épico juego de rol de acción del creador de Dark Souls',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
        platform: ['PC', 'PS5', 'Xbox Series X'],
        tags: ['RPG', 'Acción', 'Souls-like'],
        rating: 96
      },
      {
        id: '3',
        title: 'God of War Ragnarök',
        description: 'Kratos y Atreus enfrentan el Ragnarök en esta secuela épica',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
        platform: ['PS5', 'PS4'],
        tags: ['Acción', 'Aventura', 'Mitología'],
        rating: 94
      },
      {
        id: '4',
        title: 'Cyberpunk 2077',
        description: 'Vive en Night City, una megalópolis obsesionada con el poder',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        platform: ['PC', 'PS5', 'Xbox Series X'],
        tags: ['RPG', 'Ciencia ficción', 'Mundo abierto'],
        rating: 86
      },
      {
        id: '5',
        title: 'Red Dead Redemption 2',
        description: 'Una épica historia del salvaje oeste americano',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400',
        platform: ['PC', 'PS4', 'Xbox One'],
        tags: ['Aventura', 'Acción', 'Mundo abierto'],
        rating: 97
      },
      {
        id: '6',
        title: 'Minecraft',
        description: 'Construye, explora y sobrevive en un mundo de bloques infinito',
        price: 26.95,
        imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400',
        platform: ['Multiplataforma'],
        tags: ['Sandbox', 'Supervivencia', 'Construcción'],
        rating: 93
      }
    ];

    localStorage.setItem(this.gamesKey, JSON.stringify(defaultGames));
    this.games$.next(defaultGames);
  }

  /**
   * Intentar obtener juegos populares desde API (RAWG)
   * Si falla, retorna los juegos locales
   * Nota: Requiere API key en producción
   */
  fetchPopularFromAPI(apiKey?: string): Observable<any> {
    const url = apiKey
      ? `${this.apiUrl}?key=${apiKey}&ordering=-rating&page_size=12`
      : `${this.apiUrl}?ordering=-rating&page_size=12`;

    return this.http.get<any>(url).pipe(
      tap((response) => {
        if (response?.results) {
          // Mapear respuesta de API a nuestro modelo Game
          const mappedGames: Game[] = response.results.map((game: any) => ({
            id: game.id.toString(),
            title: game.name,
            description: game.description || 'Sin descripción',
            price: Math.floor(Math.random() * 50) + 19.99, // Precio aleatorio para demo
            imageUrl: game.background_image,
            platform: game.platforms?.map((p: any) => p.platform.name) || [],
            tags: game.tags?.slice(0, 3).map((t: any) => t.name) || [],
            rating: game.rating || 0
          }));

          // Actualizar juegos locales
          localStorage.setItem(this.gamesKey, JSON.stringify(mappedGames));
          this.games$.next(mappedGames);
        }
      }),
      catchError((error) => {
        console.warn('Error al obtener juegos desde API, usando datos locales', error);
        return of(this.loadLocalGames());
      })
    );
  }

  /**
   * Obtener todos los juegos
   * @returns Observable<Game[]>
   */
  getGames(): Observable<Game[]> {
    return this.games$.asObservable();
  }

  /**
   * Obtener juego por ID
   * @param id ID del juego
   * @returns Observable<Game | undefined>
   */
  getGameById(id: string): Observable<Game | undefined> {
    const games = this.games$.value;
    const game = games.find(g => g.id === id);
    return of(game);
  }

  /**
   * Agregar nuevo juego
   * @param game Juego a agregar
   */
  addGame(game: Game): void {
    const current = this.loadLocalGames();

    // Generar ID único si no existe
    if (!game.id) {
      game.id = Date.now().toString();
    }

    current.unshift(game); // Agregar al inicio
    localStorage.setItem(this.gamesKey, JSON.stringify(current));
    this.games$.next(current);
  }

  /**
   * Eliminar juego por ID
   * @param id ID del juego a eliminar
   */
  deleteGame(id: string): void {
    const current = this.loadLocalGames();
    const filtered = current.filter(g => g.id !== id);
    localStorage.setItem(this.gamesKey, JSON.stringify(filtered));
    this.games$.next(filtered);
  }

  /**
   * Actualizar juego existente
   * @param game Juego con cambios
   */
  updateGame(game: Game): void {
    const current = this.loadLocalGames();
    const index = current.findIndex(g => g.id === game.id);

    if (index !== -1) {
      current[index] = game;
      localStorage.setItem(this.gamesKey, JSON.stringify(current));
      this.games$.next(current);
    }
  }
}
