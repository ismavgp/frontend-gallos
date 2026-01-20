import { Injectable, signal } from '@angular/core';
import { Vacuna } from '../models/vacuna.model';

@Injectable({
  providedIn: 'root',
})
export class VacunasService {
  
  private vacunasData = signal<Vacuna[]>([
    {
      id: '1',
      fecha: '2024-01-15',
      producto: 'Newcastle',
      edad: '3 semanas',
      observaciones: 'Primera dosis aplicada correctamente',
      id_gallo: 'GAL-001'
    },
    {
      id: '2',
      fecha: '2024-02-10',
      producto: 'Viruela Aviar',
      edad: '6 semanas',
      observaciones: 'Sin efectos secundarios',
      id_gallo: 'GAL-001'
    },
    {
      id: '3',
      fecha: '2024-01-20',
      producto: 'Bronquitis Infecciosa',
      edad: '4 semanas',
      observaciones: 'Refuerzo necesario en 2 semanas',
      id_gallo: 'GAL-002'
    },
    {
      id: '4',
      fecha: '2024-02-15',
      producto: 'Gumboro',
      edad: '2 semanas',
      observaciones: 'Aplicación preventiva',
      id_gallo: 'GAL-003'
    },
    {
      id: '5',
      fecha: '2024-03-01',
      producto: 'Newcastle',
      edad: '8 semanas',
      observaciones: 'Segunda dosis',
      id_gallo: 'GAL-002'
    },
    {
      id: '6',
      fecha: '2024-01-25',
      producto: 'Coriza Aviar',
      edad: '5 semanas',
      observaciones: 'Vacunación completa',
      id_gallo: 'GAL-004'
    },
    {
      id: '7',
      fecha: '2024-02-20',
      producto: 'Viruela Aviar',
      edad: '6 semanas',
      observaciones: 'Aplicada en ala derecha',
      id_gallo: 'GAL-005'
    },
    {
      id: '8',
      fecha: '2024-03-05',
      producto: 'Newcastle',
      edad: '7 semanas',
      observaciones: 'Refuerzo anual',
      id_gallo: 'GAL-006'
    }
  ]);

  // Simular llamada a API REST - Obtener todas las vacunas
  getVacunas(): Promise<Vacuna[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.vacunasData());
      }, 500);
    });
  }

  // Simular llamada a API REST - Obtener vacunas por gallo
  getVacunasByGallo(id_gallo: string): Promise<Vacuna[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vacunas = this.vacunasData().filter(v => v.id_gallo === id_gallo);
        resolve(vacunas);
      }, 500);
    });
  }

  // Simular llamada a API REST - Obtener una vacuna por ID
  getVacunaById(id: string): Promise<Vacuna | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vacuna = this.vacunasData().find(v => v.id === id);
        resolve(vacuna);
      }, 500);
    });
  }

  // Simular llamada a API REST - Crear nueva vacuna
  createVacuna(vacuna: Omit<Vacuna, 'id'>): Promise<Vacuna> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newVacuna: Vacuna = {
          ...vacuna,
          id: Date.now().toString()
        };
        this.vacunasData.update(vacunas => [...vacunas, newVacuna]);
        resolve(newVacuna);
      }, 500);
    });
  }

  // Simular llamada a API REST - Actualizar vacuna
  updateVacuna(id: string, vacunaActualizada: Partial<Vacuna>): Promise<Vacuna> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.vacunasData().findIndex(v => v.id === id);
        if (index !== -1) {
          this.vacunasData.update(vacunas => {
            const nuevasVacunas = [...vacunas];
            nuevasVacunas[index] = { ...nuevasVacunas[index], ...vacunaActualizada };
            return nuevasVacunas;
          });
          resolve(this.vacunasData()[index]);
        } else {
          reject(new Error('Vacuna no encontrada'));
        }
      }, 500);
    });
  }

  // Simular llamada a API REST - Eliminar vacuna
  deleteVacuna(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.vacunasData().findIndex(v => v.id === id);
        if (index !== -1) {
          this.vacunasData.update(vacunas => vacunas.filter(v => v.id !== id));
          resolve();
        } else {
          reject(new Error('Vacuna no encontrada'));
        }
      }, 500);
    });
  }

  // Buscar vacunas por producto
  searchVacunas(term: string): Promise<Vacuna[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const termLower = term.toLowerCase();
        const filtered = this.vacunasData().filter(v => 
          v.producto.toLowerCase().includes(termLower) ||
          v.observaciones?.toLowerCase().includes(termLower) ||
          v.id_gallo.toLowerCase().includes(termLower)
        );
        resolve(filtered);
      }, 300);
    });
  }
}
