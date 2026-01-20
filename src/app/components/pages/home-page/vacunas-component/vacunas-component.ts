import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../../../shared/common/search-component/search-component';
import { ButtonComponent } from '../../../shared/common/button-component/button-component';
import { TableComponent, TableColumn, TableAction } from '../../../shared/table-component/table-component';
import { VacunasService } from '../../../../services/vacunas.service';
import { DialogService } from '../../../../services/dialog.service';
import { Vacuna } from '../../../../models/vacuna.model';

@Component({
  selector: 'app-vacunas-component',
  imports: [MatIconModule, SearchComponent, ButtonComponent, TableComponent],
  templateUrl: './vacunas-component.html',
  styleUrl: './vacunas-component.css',
  standalone: true
})
export class VacunasComponent implements OnInit {
  searchTerm = signal('');
  vacunas = signal<Vacuna[]>([]);
  filteredVacunas = signal<Vacuna[]>([]);
  loading = signal(false);

  columns: TableColumn[] = [
    { key: 'fecha', label: 'Fecha', type: 'date', width: '120px', align: 'center' },
    { key: 'producto', label: 'Producto', type: 'text', width: '200px' },
    { key: 'id_gallo', label: 'Gallo', type: 'text', width: '120px', align: 'center' },
    { key: 'edad', label: 'Edad', type: 'text', width: '100px', align: 'center' },
    { key: 'observaciones', label: 'Observaciones', type: 'text' }
  ];

  actions: TableAction[] = [
    {
      icon: 'edit',
      label: 'Editar vacuna',
      color: 'primary',
      onClick: (row) => this.editVacuna(row)
    },
    {
      icon: 'delete',
      label: 'Eliminar vacuna',
      color: 'warn',
      onClick: (row) => this.deleteVacuna(row)
    }
  ];

  constructor(
    private vacunasService: VacunasService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVacunas();
  }

  async loadVacunas() {
    this.loading.set(true);
    try {
      const vacunas = await this.vacunasService.getVacunas();
      this.vacunas.set(vacunas);
      this.filteredVacunas.set(vacunas);
    } catch (error) {
      console.error('Error al cargar vacunas:', error);
      this.dialogService.error('Error', 'No se pudieron cargar las vacunas');
    } finally {
      this.loading.set(false);
    }
  }

  async onSearch(term: string) {
    this.searchTerm.set(term);
    if (term.trim()) {
      this.loading.set(true);
      try {
        const results = await this.vacunasService.searchVacunas(term);
        this.filteredVacunas.set(results);
      } catch (error) {
        console.error('Error en búsqueda:', error);
      } finally {
        this.loading.set(false);
      }
    } else {
      this.filteredVacunas.set(this.vacunas());
    }
  }

  onClear() {
    this.searchTerm.set('');
    this.filteredVacunas.set(this.vacunas());
  }

  onAddNewVacuna() {
    this.router.navigate(['/home/vacunas/new']);
  }

  editVacuna(vacuna: Vacuna) {
    this.router.navigate(['/home/vacunas/edit', vacuna.id]);
  }

  deleteVacuna(vacuna: Vacuna) {
    this.dialogService.confirmDelete(vacuna.producto).subscribe(async (confirmed) => {
      if (confirmed) {
        this.loading.set(true);
        try {
          await this.vacunasService.deleteVacuna(vacuna.id);
          await this.loadVacunas();
          if (this.searchTerm()) {
            await this.onSearch(this.searchTerm());
          }
          this.dialogService.success('¡Eliminada!', 'La vacuna se eliminó correctamente');
        } catch (error) {
          console.error('Error al eliminar vacuna:', error);
          this.dialogService.error('Error', 'No se pudo eliminar la vacuna');
        } finally {
          this.loading.set(false);
        }
      }
    });
  }
}
