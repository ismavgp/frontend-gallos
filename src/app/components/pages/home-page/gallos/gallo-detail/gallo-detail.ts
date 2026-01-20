import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GallosService } from '../../../../../services/gallos.service';
import { GalloDetail } from '../../../../../models/gallo_detail.model';
import { ItemResumeComponent } from '../../../../shared/common/item-resume-component/item-resume-component';

@Component({
  selector: 'app-gallo-detail',
  imports: [MatIconModule, MatButtonModule, ItemResumeComponent],
  templateUrl: './gallo-detail.html',
  styleUrl: './gallo-detail.css',
})
export class GalloDetailComponent implements OnInit {
  gallo = signal<GalloDetail | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gallosService: GallosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const placa = params['placa'];
      if (placa) {
        this.loadGallo(placa);
      }
    });
  }

  async loadGallo(placa: string) {
    this.loading.set(true);
    try {
      const gallo = await this.gallosService.getGalloByPlaca(placa);
      this.gallo.set(gallo || null);
    } catch (error) {
      console.error('Error al cargar gallo:', error);
      this.gallo.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/home/gallos']);
  }

  editGallo() {
    if (this.gallo()) {
      this.router.navigate(['/home/gallos/edit', this.gallo()!.placa]);
    }
  }
}
