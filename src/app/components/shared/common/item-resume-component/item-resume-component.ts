import { Component, input } from '@angular/core';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BallNumComponent } from '../ball-num-component/ball-num-component';
import { Gallo } from '../../../../models/gallo.model';

@Component({
  selector: 'app-item-resume-component',
  imports: [MatCardModule, MatIconModule, BallNumComponent],

  templateUrl: './item-resume-component.html',
  styleUrl: './item-resume-component.css',
})
export class ItemResumeComponent {
  gallo = input<Gallo>();
  showStats = input(false);
  showDetails = input(true);
}
