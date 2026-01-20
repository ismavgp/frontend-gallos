import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { GallosService } from '../../../../../services/gallos.service';
import { Gallo } from '../../../../../models/gallo.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-gallo-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './gallo-form.html',
  styleUrl: './gallo-form.css',
})
export class GalloFormComponent implements OnInit {
  galloForm: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  placaOriginal: string | null = null;
  
  gallosDisponibles = signal<Gallo[]>([]);
  filteredPadres!: Observable<Gallo[]>;
  filteredMadres!: Observable<Gallo[]>;

  constructor(
    private fb: FormBuilder,
    private gallosService: GallosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.galloForm = this.fb.group({
      placa: ['', Validators.required],
      nombre: ['', Validators.required],
      color: [''],
      peso: [''],
      talla: [''],
      color_patas: [''],
      tipo_cresta: [''],
      sexo: ['', Validators.required],
      fecha_nacimiento: [''],
      url_foto: [''],
      placa_padre: [''],
      placa_madre: ['']
    });
  }

  ngOnInit() {
    // Cargar gallos disponibles
    this.loadGallosDisponibles();
    
    // Configurar filtros para autocomplete
    this.filteredPadres = this.galloForm.get('placa_padre')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGallos(value || ''))
    );
    
    this.filteredMadres = this.galloForm.get('placa_madre')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGallos(value || ''))
    );
    
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      const placa = params['placa'];
      if (placa) {
        this.isEditMode.set(true);
        this.placaOriginal = placa;
        this.loadGallo(placa);
      }
    });
  }

  async loadGallosDisponibles() {
    try {
      const gallos = await this.gallosService.getGallos();
      this.gallosDisponibles.set(gallos);
    } catch (error) {
      console.error('Error al cargar gallos:', error);
    }
  }

  private _filterGallos(value: string): Gallo[] {
    const filterValue = value.toLowerCase();
    return this.gallosDisponibles().filter(gallo => 
      gallo.placa.toLowerCase().includes(filterValue) ||
      gallo.nombre.toLowerCase().includes(filterValue)
    );
  }

  displayGallo(placa: string): string {
    if (!placa) return '';
    const gallo = this.gallosDisponibles().find(g => g.placa === placa);
    return gallo ? `${gallo.placa} - ${gallo.nombre}` : placa;
  }

  async loadGallo(placa: string) {
    try {
      const gallo = await this.gallosService.getGalloByPlaca(placa);
      if (gallo) {
        this.galloForm.patchValue(gallo);
      }
    } catch (error) {
      console.error('Error al cargar gallo:', error);
    }
  }

  async onSubmit() {
    if (this.galloForm.valid) {
      this.isSubmitting.set(true);
      const galloData: Gallo = this.galloForm.value;

      try {
        if (this.isEditMode() && this.placaOriginal) {
          await this.gallosService.updateGallo(this.placaOriginal, galloData);
          console.log('Gallo actualizado:', galloData);
        } else {
          await this.gallosService.createGallo(galloData);
          console.log('Gallo creado:', galloData);
        }
        this.goBack();
      } catch (error) {
        console.error('Error al guardar gallo:', error);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  goBack() {
    this.router.navigate(['/home/gallos']);
  }
}
