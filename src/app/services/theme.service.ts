import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }

    // Aplicar el tema inicial
    this.applyTheme();

    // Efecto para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme();
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
  }

  private applyTheme(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }
}
