// game.model.ts - Modelo de Videojuego (MVVM)
export interface Game {
  id?: string;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  rating: number; // 0-5
  downloads: number;
  comingSoon: boolean;
}
