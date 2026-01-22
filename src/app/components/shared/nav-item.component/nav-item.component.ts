import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  @Input() iconClass: string = '';
  @Input() text: string = '';
  @Input() active: boolean = false;
  @Input() href: string = '#';
  @Output() itemClick = new EventEmitter<void>();

  onClick(event: Event) {
    event.preventDefault();
    this.itemClick.emit();
  }
}
