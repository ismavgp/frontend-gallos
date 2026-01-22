import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from '../nav-item.component/nav-item.component';

interface MenuItem {
  iconClass: string;
  text: string;
  active?: boolean;
  href?: string;
}

@Component({
  selector: 'app-bottombar',
  imports: [CommonModule, NavItemComponent],
  templateUrl: './bottombar.component.html',
  styleUrl: './bottombar.component.css',
})
export class BottombarComponent {
  menuItems: MenuItem[] = [
    { iconClass: 'fas fa-home', text: 'Inicio', active: true },
    { iconClass: 'fas fa-box', text: 'Productos' },
    { iconClass: 'fas fa-tools', text: 'Servicios' },
    { iconClass: 'fas fa-phone', text: 'Contacto' },
  ];

  onItemClick(index: number) {
    this.menuItems = this.menuItems.map((item, i) => ({
      ...item,
      active: i === index
    }));
  }
}
