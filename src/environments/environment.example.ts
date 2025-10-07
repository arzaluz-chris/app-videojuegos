// Environment configuration for development - EXAMPLE FILE
// Copia este archivo como environment.ts y añade tu API key de RAWG
export const environment = {
  production: false,

  // API Configuration
  apiUrl: 'https://api.rawg.io/api',

  // RAWG API Key (obtener en https://rawg.io/apidocs)
  // INSTRUCCIONES:
  // 1. Regístrate en https://rawg.io/apidocs
  // 2. Obtén tu API key gratuita
  // 3. Pégala aquí entre las comillas
  rawgApiKey: '', // Insertar tu API key aquí

  // App Configuration
  appName: 'Tienda Juegos',
  appVersion: '1.0.0',

  // Features Flags
  enableAPIFetch: false, // Cambiar a true cuando tengas tu API key
  enableAnalytics: false,
  enableLogging: true,

  // Storage Keys
  storageKeys: {
    auth: 'app_demo_auth',
    users: 'users',
    games: 'local_games_demo'
  }
};
