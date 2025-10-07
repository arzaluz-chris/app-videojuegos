# Tienda de Videojuegos - Aplicación Híbrida

Aplicación híbrida desarrollada con **Angular 19** y **Capacitor 7** para la venta y gestión de videojuegos. Disponible para **iOS**, **Android** y **Web**.

## Descripción del Proyecto

Esta es una aplicación de demostración educativa que simula una tienda de videojuegos online. La aplicación implementa:

- Arquitectura MVVM (Model-View-ViewModel)
- Diseño moderno y minimalista con tipografía Inter
- Sistema de autenticación local (LocalStorage)
- Gestión de catálogo de videojuegos
- Interfaz responsiva para múltiples plataformas

> **Nota:** Este proyecto es una aplicación de demostración con fines educativos. No realiza transacciones reales y almacena los datos localmente.

## Características Principales

- ✅ Registro e inicio de sesión de usuarios
- ✅ Listado de videojuegos con información detallada
- ✅ Formulario para agregar nuevos videojuegos
- ✅ Guardas de ruta para proteger vistas
- ✅ Persistencia de datos en LocalStorage
- ✅ Soporte multiplataforma (iOS, Android, Web)
- ✅ Integración opcional con API RAWG
- ✅ Diseño responsive con grid adaptable

## Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **Capacitor 7** - Para compilación híbrida (iOS/Android)
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **SCSS** - Estilos con variables CSS

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Angular CLI** - Instalar con: `npm install -g @angular/cli`
- **Git** - [Descargar aquí](https://git-scm.com/)

### Para desarrollo móvil adicional:

#### iOS:
- **macOS** con Xcode instalado
- **CocoaPods** - Instalar con: `sudo gem install cocoapods`

#### Android:
- **Android Studio** con SDK configurado
- **Java JDK** (v17 o superior)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/arzaluz-chris/app-videojuegos.git
cd app-videojuegos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## Comandos Disponibles

### Desarrollo Web

```bash
# Iniciar servidor de desarrollo
npm start

# O usando Angular CLI directamente
ng serve
```

### Compilar para Producción

```bash
# Build de producción para web
npm run build:prod

# Build regular
npm run build
```

Los archivos compilados estarán en la carpeta `dist/tienda-juegos/browser/`.

### Desarrollo Móvil

#### Sincronizar cambios con las plataformas nativas

Después de hacer cambios en el código, sincroniza con las plataformas móviles:

```bash
npm run cap:sync
```

#### Android

```bash
# Compilar y abrir en Android Studio
npm run android

# O paso a paso:
npm run build:prod
npm run cap:sync
npm run cap:open:android
```

#### iOS (solo en macOS)

```bash
# Compilar y abrir en Xcode
npm run ios

# O paso a paso:
npm run build:prod
npm run cap:sync
npm run cap:open:ios
```

### Testing

```bash
# Ejecutar tests unitarios
npm test
```

## Estructura del Proyecto

```
src/app/
├── core/                      # Servicios y guardas centrales
│   ├── services/
│   │   ├── auth.service.ts    # ViewModel: Autenticación
│   │   └── games.service.ts   # ViewModel: Gestión de juegos
│   └── guards/
│       └── auth.guard.ts      # Protección de rutas
├── features/                  # Módulos de funcionalidades
│   ├── auth/
│   │   ├── login/             # Vista: Login
│   │   └── register/          # Vista: Registro
│   ├── games/
│   │   ├── games-list/        # Vista: Catálogo
│   │   └── game-add/          # Vista: Agregar juego
│   └── profile/
│       └── profile/           # Vista: Perfil usuario
├── shared/                    # Componentes y modelos compartidos
│   ├── models/
│   │   ├── user.model.ts      # Model: Usuario
│   │   └── game.model.ts      # Model: Videojuego
│   └── navbar/                # Componente: Navegación
└── app.routes.ts              # Configuración de rutas
```

## Arquitectura MVVM

El proyecto sigue el patrón arquitectónico MVVM adaptado a Angular:

- **Model**: Interfaces y clases (`User`, `Game`) en `shared/models/`
- **View**: Componentes y templates Angular (HTML/SCSS)
- **ViewModel**: Servicios con RxJS (`BehaviorSubject`, `Observables`) que gestionan el estado y la lógica

## Rutas Disponibles

| Ruta | Componente | Protección | Descripción |
|------|-----------|------------|-------------|
| `/` | - | Pública | Redirige a `/games` |
| `/login` | LoginComponent | Pública | Iniciar sesión |
| `/register` | RegisterComponent | Pública | Crear cuenta |
| `/games` | GamesListComponent | Pública | Catálogo de juegos |
| `/games/add` | GameAddComponent | **Protegida** | Agregar nuevo juego |
| `/profile` | ProfileComponent | **Protegida** | Perfil del usuario |

## Flujo de Uso

1. **Registro**: Crear una cuenta de usuario en `/register`
2. **Login**: Iniciar sesión con las credenciales creadas
3. **Explorar**: Ver el catálogo de videojuegos en `/games`
4. **Agregar**: Añadir nuevos juegos al catálogo (requiere autenticación)
5. **Perfil**: Ver información del usuario y cerrar sesión en `/profile`

## Personalización

### Colores y Estilos

Los colores globales se pueden modificar en `src/styles.scss`:

```scss
:root {
  --color-primary: #667eea;
  --color-primary-dark: #764ba2;
  --color-success: #10b981;
  // ...
}
```

### Datos Mock

Los videojuegos de demostración están definidos en:
- `src/app/core/services/games.service.ts` (método `setDefaultGames()`)
- `public/assets/mock/games.json`

## Integración con API RAWG

La aplicación puede integrarse con la API de RAWG para obtener datos reales de videojuegos.

1. Obtén una API key gratuita en [rawg.io/apidocs](https://rawg.io/apidocs)
2. Configura la key en `src/environments/environment.ts`
3. La aplicación intentará obtener datos de la API; si falla, usa datos mock locales

## Despliegue

### Web
Los archivos compilados (`dist/`) pueden desplegarse en:
- GitHub Pages
- Netlify
- Vercel
- Cualquier servidor web estático

### Móvil

#### Android
1. Abre el proyecto en Android Studio con `npm run cap:open:android`
2. Genera APK o AAB firmado desde **Build → Generate Signed Bundle / APK**
3. Sube a Google Play Console

#### iOS
1. Abre el proyecto en Xcode con `npm run cap:open:ios` (macOS)
2. Configura certificados y provisioning profiles
3. Archiva y sube a App Store Connect

## Contribuir

Este es un proyecto educativo. Para contribuir:

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## Seguridad y Consideraciones

**⚠️ IMPORTANTE**: Esta aplicación es una demostración educativa.

- Los datos de usuarios (incluyendo contraseñas) se almacenan en **localStorage sin encriptación**
- **NO usar en producción sin implementar seguridad adecuada**

Para producción, se recomienda:
- Backend con autenticación segura (JWT, OAuth)
- Hash de contraseñas con bcrypt
- HTTPS obligatorio
- Tokens de sesión con expiración
- Validación del lado del servidor

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## Autor

Christian Arzaluz - [GitHub](https://github.com/arzaluz-chris)

## Contacto

Para preguntas o sugerencias, por favor abre un issue en el [repositorio de GitHub](https://github.com/arzaluz-chris/app-videojuegos).

---

Desarrollado con Angular 19 y arquitectura MVVM
