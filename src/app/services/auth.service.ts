import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  async login(email: string, password: string): Promise<boolean> {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'ismael@gmail.com' && password === '123456') {
          localStorage.setItem('token', 'dummy-jwt-token');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

}
