import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { VacunasService } from '../../../../../services/vacunas.service';
import { GallosService } from '../../../../../services/gallos.service';
import { DialogService } from '../../../../../services/dialog.service';
import { Vacuna } from '../../../../../models/vacuna.model';
import { Gallo } from '../../../../../models/gallo.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vacuna-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './vacuna-form.html',
  styleUrl: './vacuna-form.css',
  standalone: true
})
export class VacunaFormComponent implements OnInit {
  vacunaForm: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  idOriginal: string | null = null;
  
  gallosDisponibles = signal<Gallo[]>([]);
  filteredGallos!: Observable<Gallo[]>;

  constructor(
    private fb: FormBuilder,
    private vacunasService: VacunasService,
    private gallosService: GallosService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vacunaForm = this.fb.group({
      fecha: ['', Validators.required],
      producto: ['', Validators.required],
      id_gallo: ['', Validators.required],
      edad: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit() {
    // Cargar gallos disponibles
    this.loadGallosDisponibles();
    
    // Configurar filtro para autocomplete
    this.filteredGallos = this.vacunaForm.get('id_gallo')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGallos(value || ''))
    );
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode.set(true);
        this.idOriginal = id;
        this.loadVacuna(id);
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

  async loadVacuna(id: string) {
    try {
      const vacuna = await this.vacunasService.getVacunaById(id);
      if (vacuna) {
        this.vacunaForm.patchValue(vacuna);
      } else {
        this.dialogService.error('Error', 'Vacuna no encontrada');
        this.goBack();
      }
    } catch (error) {
      console.error('Error al cargar vacuna:', error);
      this.dialogService.error('Error', 'No se pudo cargar la vacuna');
      this.goBack();
    }
  }

  async onSubmit() {
    if (this.vacunaForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      
      try {
        const vacunaData = this.vacunaForm.value;
        
        if (this.isEditMode() && this.idOriginal) {
          await this.vacunasService.updateVacuna(this.idOriginal, vacunaData);
          this.dialogService.success('¡Éxito!', 'Vacuna actualizada correctamente');
        } else {
          await this.vacunasService.createVacuna(vacunaData);
          this.dialogService.success('¡Éxito!', 'Vacuna creada correctamente');
        }
        
        this.goBack();
      } catch (error) {
        console.error('Error al guardar vacuna:', error);
        this.dialogService.error('Error', 'No se pudo guardar la vacuna');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }

  goBack() {
    this.router.navigate(['/home/vacunas']);
  }
}
