import { Component, EventEmitter, Output, Input, signal, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() debounceTime: number = 300;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() showClearButton: boolean = true;
  @Input() icon: string = 'search';
  
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchControl = new FormControl('');
  searchValue = signal('');

  constructor() {
    // Escuchar cambios en el control con debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const searchTerm = value ?? '';
        this.searchValue.set(searchTerm);
        this.search.emit(searchTerm);
      });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.searchValue.set('');
    this.clear.emit();
  }

  hasValue(): boolean {
    return this.searchValue().length > 0;
  }
}
