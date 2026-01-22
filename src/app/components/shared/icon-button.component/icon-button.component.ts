import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-button',
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  @Input() icon: string = '';
  @Input() iconClass: string = ''; // Para clases de Font Awesome
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
