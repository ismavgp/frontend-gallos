import { Component, signal, computed, effect } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BottomNav } from "../../shared/bottom-nav/bottom-nav";
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Header } from "../../shared/header/header";
import { Sidebar } from "../../shared/sidebar/sidebar";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    BottomNav,
    RouterModule,
    Header,
    Sidebar
  ]
})
export class HomePageComponent {
  sidebarOpen = signal(false);
  showBottomNav = signal(true);

  // Rutas de usuario donde no se muestra el bottom nav
  private userRoutes = [
    '/home/account/profile', 
    '/home/account/password-change', 
    '/home/account/payment-methods', 
    '/home/account/settings'
  ];

  constructor(private router: Router) {
    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkRoute(event.url);
      });
    
    // Verificar ruta inicial
    this.checkRoute(this.router.url);
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  private checkRoute(url: string) {
    // Ocultar bottom nav si estamos en una ruta de usuario
    const isUserRoute = this.userRoutes.some(route => url.includes(route));
    this.showBottomNav.set(!isUserRoute);
  }
}
