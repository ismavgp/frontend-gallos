import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Output() close = new EventEmitter<void>();

  constructor(public themeService: ThemeService) {}

  closeSidebar() {
    this.close.emit();
  }
}
