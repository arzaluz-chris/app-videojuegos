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
        title: 'The Soccer 2020',
        description: 'Es un videojuego de fútbol desarrollado por FreeDev, está próximo a ser lanzado para las plataformas más populares de videojuegos. Actualmente se encuentra una versión de demo donde los usuarios pueden probar el videojuego aunque tiene funciones limitadas por el momento.',
        releaseDate: '29/octubre/2020',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
        rating: 4.5,
        downloads: 150,
        comingSoon: true
      },
      {
        id: '2',
        title: 'Racing Champions',
        description: 'Juego de carreras de alta velocidad con gráficos realistas y competencia multijugador.',
        releaseDate: '15/marzo/2021',
        imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400',
        rating: 4.2,
        downloads: 200,
        comingSoon: false
      },
      {
        id: '3',
        title: 'Adventure Quest',
        description: 'Explora mundos fantásticos y resuelve enigmas en esta aventura épica.',
        releaseDate: '10/enero/2022',
        imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
        rating: 4.8,
        downloads: 350,
        comingSoon: false
      },
      {
        id: '4',
        title: 'Space Warriors',
        description: 'Combate espacial intenso con misiones estratégicas y batallas masivas.',
        releaseDate: '05/julio/2023',
        imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
        rating: 4.6,
        downloads: 280,
        comingSoon: false
      },
      {
        id: '5',
        title: 'Fantasy Kingdom',
        description: 'Construye tu reino y conquista territorios en este juego de estrategia medieval.',
        releaseDate: '20/septiembre/2023',
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
        rating: 4.3,
        downloads: 120,
        comingSoon: false
      },
      {
        id: '6',
        title: 'Battle Royale X',
        description: 'Sobrevive en un mundo hostil lleno de enemigos en este battle royale.',
        releaseDate: '01/noviembre/2024',
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        rating: 4.1,
        downloads: 90,
        comingSoon: false
      },
      {
        id: '7',
        title: 'Zombie Apocalypse',
        description: 'Lucha por tu supervivencia en un mundo infestado de zombies.',
        releaseDate: '12/diciembre/2024',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
        rating: 4.7,
        downloads: 420,
        comingSoon: false
      },
      {
        id: '8',
        title: 'Dragon Legends',
        description: 'Conviértete en un maestro de dragones y conquista el reino.',
        releaseDate: '30/junio/2025',
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400',
        rating: 3.9,
        downloads: 75,
        comingSoon: true
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
   * Obtener juegos más populares (rating > 4)
   * @returns Observable<Game[]>
   */
  getMostPopular(): Observable<Game[]> {
    const games = this.games$.value;
    const popular = games.filter(game => game.rating > 4 && !game.comingSoon);
    return of(popular);
  }

  /**
   * Obtener juegos más descargados (downloads > 100)
   * @returns Observable<Game[]>
   */
  getMostDownloaded(): Observable<Game[]> {
    const games = this.games$.value;
    const downloaded = games.filter(game => game.downloads > 100 && !game.comingSoon);
    return of(downloaded);
  }

  /**
   * Obtener juegos próximamente (comingSoon === true)
   * @returns Observable<Game[]>
   */
  getComingSoon(): Observable<Game[]> {
    const games = this.games$.value;
    const upcoming = games.filter(game => game.comingSoon === true);
    return of(upcoming);
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
