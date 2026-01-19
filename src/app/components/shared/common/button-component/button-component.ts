import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button-component',
  imports: [MatButtonModule, MatIconModule, MatRippleModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() backgroundColor: string = '#DC143C';
  @Input() textColor: string = '#ffffff';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() variant: 'raised' | 'flat' | 'stroked' | 'icon' = 'raised';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

  get buttonClass(): string {
    const classes = ['custom-button'];
    if (this.fullWidth) classes.push('full-width');
    classes.push(`size-${this.size}`);
    return classes.join(' ');
  }
}
