import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  nombre: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = this.getToken();
    const userStr = localStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.isAuthenticated.set(true);
        this.currentUser.set(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Simulación de llamada API
      await this.delay(1000);
      
      // Mock: validación simple
      if (email && password.length >= 6) {
        const mockUser: User = {
          email,
          nombre: 'Usuario Demo',
          token: this.generateMockToken()
        };
        
        this.setAuthData(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  async register(email: string, password: string, nombre: string): Promise<boolean> {
    try {
      // Simulación de llamada API
      await this.delay(1000);
      
      // Mock: validación simple
      if (email && password.length >= 6 && nombre) {
        const mockUser: User = {
          email,
          nombre,
          token: this.generateMockToken()
        };
        
        this.setAuthData(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setAuthData(user: User) {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.isAuthenticated.set(true);
    this.currentUser.set(user);
  }

  private generateMockToken(): string {
    return 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
