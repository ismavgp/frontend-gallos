import { Component } from '@angular/core';
import {  MatCardModule } from '@angular/material/card';
import { BallNumComponent } from '../ball-num-component/ball-num-component';

@Component({
  selector: 'app-item-resume-component',
  imports: [MatCardModule,BallNumComponent],

  templateUrl: './item-resume-component.html',
  styleUrl: './item-resume-component.css',
})
export class ItemResumeComponent {

}
