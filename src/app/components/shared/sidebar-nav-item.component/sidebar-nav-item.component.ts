import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-nav-item',
  imports: [CommonModule],
  templateUrl: './sidebar-nav-item.component.html',
  styleUrl: './sidebar-nav-item.component.css',
})
export class SidebarNavItemComponent {
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
