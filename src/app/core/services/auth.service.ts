import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authKey = 'app_demo_auth';
  private usersKey = 'users';
  private user$ = new BehaviorSubject<User | null>(this.loadUser());

  constructor() { }

  /**
   * Cargar usuario desde localStorage
   */
  private loadUser(): User | null {
    const raw = localStorage.getItem(this.authKey);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * Login - Autenticar usuario
   * @param credentials Email y contraseña
   * @returns Observable<boolean> indicando si el login fue exitoso
   */
  login(credentials: { email: string; password: string }): Observable<boolean> {
    const stored: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = stored.find((u: User) =>
      u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem(this.authKey, JSON.stringify(user));
      this.user$.next(user);
      return of(true);
    }
    return of(false);
  }

  /**
   * Register - Registrar nuevo usuario
   * @param user Usuario a registrar
   * @returns Observable<boolean> indicando si el registro fue exitoso
   */
  register(user: User): Observable<boolean> {
    const stored: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');

    // Verificar si el email ya existe
    const exists = stored.some((u: User) => u.email === user.email);
    if (exists) {
      return of(false);
    }

    // Generar ID único
    user.id = Date.now().toString();

    stored.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(stored));
    return of(true);
  }

  /**
   * Logout - Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.authKey);
    this.user$.next(null);
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns Observable<boolean>
   */
  isAuthenticated(): Observable<boolean> {
    return this.user$.asObservable().pipe(map(u => !!u));
  }

  /**
   * Obtener el usuario actual
   * @returns Observable<User | null>
   */
  getCurrentUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  /**
   * Obtener el usuario actual de forma síncrona
   * @returns User | null
   */
  getCurrentUserSync(): User | null {
    return this.user$.value;
  }
}
