import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavItemComponent } from '../sidebar-nav-item.component/sidebar-nav-item.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

interface MenuItem {
  iconClass: string;
  text: string;
  active?: boolean;
  href?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarNavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { iconClass: 'fas fa-home', text: 'Inicio', active: true, href: '/home' },
    { iconClass: 'fas fa-chart-line', text: 'Estadísticas' },
    { iconClass: 'fas fa-folder', text: 'Proyectos' },
    { iconClass: 'fas fa-tasks', text: 'Tareas' },
    { iconClass: 'fas fa-users', text: 'Equipo' },
    { iconClass: 'fas fa-cog', text: 'Configuración' },
    { iconClass: 'fas fa-sign-out-alt', text: 'Cerrar Sesión' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  close() {
    this.closeSidebar.emit();
  }

  onItemClick(index: number) {
    const selectedItem = this.menuItems[index];
    if (selectedItem.text === 'Cerrar Sesión') {
      this.logout();
    } else {
      this.menuItems = this.menuItems.map((item, i) => ({
        ...item,
        active: i === index
      }));
      if (selectedItem.href) {
        this.router.navigate([selectedItem.href]);
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
