import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() block: boolean = false;
  @Input() disabled: boolean = false;

  get buttonClasses(): string {
    const classes = ['btn'];
    
    classes.push(`btn-${this.variant}`);
    
    if (this.size === 'sm') classes.push('btn-sm');
    if (this.size === 'lg') classes.push('btn-lg');
    if (this.block) classes.push('btn-block');
    
    return classes.join(' ');
  }
}
