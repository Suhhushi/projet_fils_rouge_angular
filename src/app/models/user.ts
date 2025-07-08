export interface User {
  id?: number;
  email: string;
  password?: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'user';
  avatar?: string;
  dateCreation?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
