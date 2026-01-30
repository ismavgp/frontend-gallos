import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GallosService } from '../../../services/gallos.service';

@Component({
  selector: 'app-gallos',
  imports: [],
  templateUrl: './gallos.html',
  styleUrl: './gallos.css',
})
export class Gallos {

  gallos: any[] = [];


  constructor(private gallosService: GallosService) { }

  ngOnInit(): void {

    this.getAll();


  }


  getAll() {
    this.gallosService.getAll().subscribe({
      next: (response) => {

        console.log(this.gallos);

      },
      error: (error) => {
        console.error('Error fetching gallos:', error);
      }
    });
  }


}
