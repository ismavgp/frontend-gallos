import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { LogoComponent } from '../logo.component/logo.component';
import { IconButtonComponent } from '../icon-button.component/icon-button.component';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() userClick = new EventEmitter<void>();
  
  isDarkMode = false;
  themeIcon = 'fas fa-moon';

  ngOnInit() {
    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  onThemeToggle() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.themeIcon = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.themeIcon = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  }

  onUserClick() {
    this.userClick.emit();
  }
}
