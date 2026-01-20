import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchComponent } from '../../../shared/common/search-component/search-component';
import { ButtonComponent } from "../../../shared/common/button-component/button-component";
import { ItemResumeComponent } from '../../../shared/common/item-resume-component/item-resume-component';
import { GallosService } from '../../../../services/gallos.service';
import { DialogService } from '../../../../services/dialog.service';
import { Gallo } from '../../../../models/gallo.model';

@Component({
  selector: 'app-gallos-component',
  imports: [SearchComponent, MatIconModule, MatButtonModule, MatTooltipModule, ButtonComponent, ItemResumeComponent],
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
    private dialogService: DialogService,
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

  async onDeleteGallo(event: Event, gallo: Gallo) {
    event.stopPropagation(); // Prevenir la navegación al detalle
    
    this.dialogService.confirmDelete(gallo.nombre).subscribe(async (confirmed) => {
      if (confirmed) {
        this.loading.set(true);
        try {
          await this.gallosService.deleteGallo(gallo.placa);
          await this.loadGallos(); // Recargar la lista
          // Si estábamos filtrando, aplicar el filtro de nuevo
          if (this.searchTerm()) {
            await this.onSearch(this.searchTerm());
          }
        } catch (error) {
          console.error('Error al eliminar gallo:', error);
          this.dialogService.alert('Error', 'No se pudo eliminar el gallo. Intenta de nuevo.');
        } finally {
          this.loading.set(false);
        }
      }
    });
  }
}
