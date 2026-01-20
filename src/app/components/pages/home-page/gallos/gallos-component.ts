import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../../../shared/common/search-component/search-component';
import { ButtonComponent } from "../../../shared/common/button-component/button-component";
import { GallosService } from '../../../../services/gallos.service';
import { Gallo } from '../../../../models/gallo.model';

@Component({
  selector: 'app-gallos-component',
  imports: [SearchComponent, MatIconModule, ButtonComponent],
  templateUrl: './gallos-component.html',
  styleUrl: './gallos-component.css',
})
export class GallosComponent implements OnInit {
  searchTerm = signal('');
  gallos = signal<Gallo[]>([]);
  filteredGallos = signal<Gallo[]>([]);
  loading = signal(false);

  constructor(
    private gallosService: GallosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGallos();
  }

  async loadGallos() {
    this.loading.set(true);
    try {
      const gallos = await this.gallosService.getGallos();
      this.gallos.set(gallos);
      this.filteredGallos.set(gallos);
    } catch (error) {
      console.error('Error al cargar gallos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async onSearch(term: string) {
    this.searchTerm.set(term);
    if (term.trim()) {
      this.loading.set(true);
      try {
        const results = await this.gallosService.searchGallos(term);
        this.filteredGallos.set(results);
      } catch (error) {
        console.error('Error en búsqueda:', error);
      } finally {
        this.loading.set(false);
      }
    } else {
      this.filteredGallos.set(this.gallos());
    }
  }

  onClear() {
    this.searchTerm.set('');
    this.filteredGallos.set(this.gallos());
  }

  onAddNewGallo() {
    this.router.navigate(['/home/gallos/new']);
  }

  onGalloClick(placa: string) {
    this.router.navigate(['/home/gallos', placa]);
  }
}
