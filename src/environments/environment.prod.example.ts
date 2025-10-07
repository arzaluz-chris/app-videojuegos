// Environment configuration for production - EXAMPLE FILE
// Copia este archivo como environment.prod.ts y añade tu API key de RAWG
export const environment = {
  production: true,

  // API Configuration
  apiUrl: 'https://api.rawg.io/api',

  // RAWG API Key (obtener en https://rawg.io/apidocs)
  rawgApiKey: '', // Insertar tu API key aquí para producción

  // App Configuration
  appName: 'Tienda Juegos',
  appVersion: '1.0.0',

  // Features Flags
  enableAPIFetch: false, // Cambiar a true en producción si tienes API key
  enableAnalytics: true,
  enableLogging: false,

  // Storage Keys
  storageKeys: {
    auth: 'app_demo_auth',
    users: 'users',
    games: 'local_games_demo'
  }
};
