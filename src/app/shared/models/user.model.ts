// user.model.ts - Modelo de Usuario (MVVM)
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // solo para demo; en producción NUNCA guardar contraseñas en claro
  avatar?: string;
}
