import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() toggle = new EventEmitter<void>();

  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search.emit(value ?? '');
      });
  }

  clear() {
    this.searchControl.setValue('');
  }

  goToHome() {
    this.router.navigate(['/home/dashboard']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
