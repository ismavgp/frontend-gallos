import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-ball-num-component',
  imports: [MatRippleModule],
  templateUrl: './ball-num-component.html',
  styleUrl: './ball-num-component.css',
})
export class BallNumComponent {

  @Input() number: number = 0;
  @Input() color: string = '#ffcc00';
  @Input() size: 'small' | 'medium' | 'large' = 'small';

  get ballSize(): string {
    const sizes = {
      small: '32px',
      medium: '40px',
      large: '48px'
    };
    return sizes[this.size];
  }

  get fontSize(): string {
    const sizes = {
      small: '12px',
      medium: '14px',
      large: '16px'
    };
    return sizes[this.size];
  }
}
