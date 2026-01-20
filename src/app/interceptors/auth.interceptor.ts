import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Lista de URLs que no requieren token
  const publicUrls = ['/login', '/register', '/auth'];
  
  // Verificar si la URL requiere autenticación
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));
  
  if (isPublicUrl) {
    return next(req);
  }
  
  // Agregar token a las peticiones protegidas
  const token = authService.getToken();
  
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
  
  return next(req);
};
