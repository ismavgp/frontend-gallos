import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header.component/header.component";
import { SidebarComponent } from '../shared/sidebar.component/sidebar.component';
import { BottombarComponent } from "../shared/bottombar.component/bottombar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidebarComponent, BottombarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
