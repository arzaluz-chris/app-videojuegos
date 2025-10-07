// game.model.ts - Modelo de Videojuego (MVVM)
export interface Game {
  id: string;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  platform?: string[];
  tags?: string[];
  rating?: number;
}
