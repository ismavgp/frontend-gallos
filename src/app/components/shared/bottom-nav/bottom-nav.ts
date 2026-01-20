import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-bottom-nav',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNav {
  constructor(public themeService: ThemeService) {}
}
