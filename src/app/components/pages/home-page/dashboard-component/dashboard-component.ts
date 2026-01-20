import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dashboard-component',
  imports: [ MatIconModule],
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
