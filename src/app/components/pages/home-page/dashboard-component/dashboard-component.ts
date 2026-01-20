import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../../../shared/common/search-component/search-component';

import { ItemResumeComponent } from "../../../shared/common/item-resume-component/item-resume-component";
import { ButtonComponent } from "../../../shared/common/button-component/button-component";

@Component({
  selector: 'app-dashboard-component',
  imports: [SearchComponent, MatIconModule, ItemResumeComponent, ButtonComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {

  searchTerm = signal('');

  onSearch(term: string) {
    this.searchTerm.set(term);
    console.log('Buscando:', term);
    // Aquí iría tu lógica de búsqueda
  }

  onClear() {
    this.searchTerm.set('');
    console.log('Búsqueda limpiada');
    // Aquí iría tu lógica para resetear resultados
  }

  onAddNewGallo() {
    throw new Error('Method not implemented.');
  }
}
