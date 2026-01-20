import { Injectable, signal } from '@angular/core';
import { Gallo } from '../models/gallo.model';
import { GalloDetail } from '../models/gallo_detail.model';

@Injectable({
  providedIn: 'root'
})
export class GallosService {
  
  private gallosData = signal<Gallo[]>([
    {
      placa: 'GAL-001',
      nombre: 'Relámpago',
      color: 'Rojo con negro',
      peso: '2.5 kg',
      talla: 'Grande',
      color_patas: 'Amarillo',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2023-05-15',
      placa_padre: 'GAL-025',
      placa_madre: 'GAL-026',
      url_foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtupsKggHLuAGNHLAWHGRnz6CRHD5W9a7_Q&s'
    },
    {
      placa: 'GAL-002',
      nombre: 'Trueno',
      color: 'Negro azabache',
      peso: '2.8 kg',
      talla: 'Grande',
      color_patas: 'Verde',
      tipo_cresta: 'Rosa',
      sexo: 'Macho',
      fecha_nacimiento: '2023-03-20',
      placa_padre: 'GAL-015',
      placa_madre: 'GAL-018',
      url_foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtupsKggHLuAGNHLAWHGRnz6CRHD5W9a7_Q&s'
    },
    {
      placa: 'GAL-003',
      nombre: 'Ceniza',
      color: 'Gris plateado',
      peso: '2.3 kg',
      talla: 'Mediano',
      color_patas: 'Amarillo',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2023-07-10',
      placa_padre: 'GAL-001',
      placa_madre: 'GAL-020',
      url_foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtupsKggHLuAGNHLAWHGRnz6CRHD5W9a7_Q&s'
    },
    {
      placa: 'GAL-004',
      nombre: 'Dorado',
      color: 'Amarillo dorado',
      peso: '2.6 kg',
      talla: 'Grande',
      color_patas: 'Blanco',
      tipo_cresta: 'Nuez',
      sexo: 'Macho',
      fecha_nacimiento: '2023-04-05',
      placa_padre: 'GAL-012',
      placa_madre: 'GAL-013',
      url_foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtupsKggHLuAGNHLAWHGRnz6CRHD5W9a7_Q&s'
    },
    {
      placa: 'GAL-005',
      nombre: 'Fuego',
      color: 'Rojo intenso',
      peso: '2.7 kg',
      talla: 'Grande',
      color_patas: 'Rojo',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2023-02-18',
      placa_padre: 'GAL-008',
      placa_madre: 'GAL-009',
      url_foto: 'https://images.unsplash.com/photo-1598567362494-2764503d2d9f?w=400'
    },
    {
      placa: 'GAL-006',
      nombre: 'Sombra',
      color: 'Negro con blanco',
      peso: '2.4 kg',
      talla: 'Mediano',
      color_patas: 'Negro',
      tipo_cresta: 'Rosa',
      sexo: 'Macho',
      fecha_nacimiento: '2023-06-22',
      placa_padre: 'GAL-002',
      placa_madre: 'GAL-021',
      url_foto: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=400'
    },
    {
      placa: 'GAL-007',
      nombre: 'Esmeralda',
      color: 'Verde tornasol',
      peso: '2.0 kg',
      talla: 'Pequeño',
      color_patas: 'Verde',
      tipo_cresta: 'Simple',
      sexo: 'Hembra',
      fecha_nacimiento: '2023-08-30',
      placa_padre: 'GAL-004',
      placa_madre: 'GAL-022',
      url_foto: 'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400'
    },
    {
      placa: 'GAL-008',
      nombre: 'Rey',
      color: 'Blanco puro',
      peso: '2.9 kg',
      talla: 'Grande',
      color_patas: 'Blanco',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2023-01-12',
      placa_padre: 'GAL-030',
      placa_madre: 'GAL-031',
      url_foto: 'https://images.unsplash.com/photo-1594997780442-6f1c50c4e814?w=400'
    },
    {
      placa: 'GAL-009',
      nombre: 'Cobalto',
      color: 'Azul metálico',
      peso: '2.5 kg',
      talla: 'Mediano',
      color_patas: 'Azul',
      tipo_cresta: 'Nuez',
      sexo: 'Macho',
      fecha_nacimiento: '2023-09-05',
      placa_padre: 'GAL-003',
      placa_madre: 'GAL-023',
      url_foto: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=400'
    },
    {
      placa: 'GAL-010',
      nombre: 'Canela',
      color: 'Marrón canela',
      peso: '2.2 kg',
      talla: 'Mediano',
      color_patas: 'Amarillo',
      tipo_cresta: 'Simple',
      sexo: 'Hembra',
      fecha_nacimiento: '2023-10-15',
      placa_padre: 'GAL-005',
      placa_madre: 'GAL-024',
      url_foto: 'https://images.unsplash.com/photo-1623636163108-f2c66dc65c49?w=400'
    },
    {
      placa: 'GAL-011',
      nombre: 'Titan',
      color: 'Rojo oscuro',
      peso: '3.0 kg',
      talla: 'Grande',
      color_patas: 'Negro',
      tipo_cresta: 'Rosa',
      sexo: 'Macho',
      fecha_nacimiento: '2023-03-08',
      placa_padre: 'GAL-001',
      placa_madre: 'GAL-027',
      url_foto: 'https://images.unsplash.com/photo-1612024782955-49b2a1f6d0e5?w=400'
    },
    {
      placa: 'GAL-012',
      nombre: 'Luna',
      color: 'Blanco plateado',
      peso: '1.9 kg',
      talla: 'Pequeño',
      color_patas: 'Blanco',
      tipo_cresta: 'Simple',
      sexo: 'Hembra',
      fecha_nacimiento: '2023-11-20',
      placa_padre: 'GAL-008',
      placa_madre: 'GAL-028',
      url_foto: 'https://images.unsplash.com/photo-1603349206295-dde20617cb6a?w=400'
    },
    {
      placa: 'GAL-013',
      nombre: 'Águila',
      color: 'Café con negro',
      peso: '2.7 kg',
      talla: 'Grande',
      color_patas: 'Verde',
      tipo_cresta: 'Nuez',
      sexo: 'Macho',
      fecha_nacimiento: '2023-04-25',
      placa_padre: 'GAL-006',
      placa_madre: 'GAL-029',
      url_foto: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=400'
    },
    {
      placa: 'GAL-014',
      nombre: 'Ámbar',
      color: 'Naranja ámbar',
      peso: '2.1 kg',
      talla: 'Mediano',
      color_patas: 'Amarillo',
      tipo_cresta: 'Simple',
      sexo: 'Hembra',
      fecha_nacimiento: '2023-12-01',
      placa_padre: 'GAL-004',
      placa_madre: 'GAL-032',
      url_foto: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400'
    },
    {
      placa: 'GAL-015',
      nombre: 'Vikingo',
      color: 'Gris acero',
      peso: '2.8 kg',
      talla: 'Grande',
      color_patas: 'Negro',
      tipo_cresta: 'Rosa',
      sexo: 'Macho',
      fecha_nacimiento: '2023-05-30',
      placa_padre: 'GAL-011',
      placa_madre: 'GAL-033',
      url_foto: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400'
    },
    {
      placa: 'GAL-016',
      nombre: 'Coral',
      color: 'Rojo coral',
      peso: '2.0 kg',
      talla: 'Pequeño',
      color_patas: 'Rojo',
      tipo_cresta: 'Simple',
      sexo: 'Hembra',
      fecha_nacimiento: '2024-01-10',
      placa_padre: 'GAL-005',
      placa_madre: 'GAL-034',
      url_foto: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=400'
    },
    {
      placa: 'GAL-017',
      nombre: 'Obsidiana',
      color: 'Negro brillante',
      peso: '2.6 kg',
      talla: 'Grande',
      color_patas: 'Negro',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2024-02-14',
      placa_padre: 'GAL-002',
      placa_madre: 'GAL-035',
      url_foto: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400'
    },
    {
      placa: 'GAL-018',
      nombre: 'Jade',
      color: 'Verde jade',
      peso: '2.2 kg',
      talla: 'Mediano',
      color_patas: 'Verde',
      tipo_cresta: 'Nuez',
      sexo: 'Hembra',
      fecha_nacimiento: '2024-03-22',
      placa_padre: 'GAL-009',
      placa_madre: 'GAL-036',
      url_foto: 'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400'
    },
    {
      placa: 'GAL-019',
      nombre: 'Zafiro',
      color: 'Azul zafiro',
      peso: '2.5 kg',
      talla: 'Mediano',
      color_patas: 'Azul',
      tipo_cresta: 'Simple',
      sexo: 'Macho',
      fecha_nacimiento: '2024-04-18',
      placa_padre: 'GAL-013',
      placa_madre: 'GAL-037',
      url_foto: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=400'
    },
    {
      placa: 'GAL-020',
      nombre: 'Rubí',
      color: 'Rojo rubí',
      peso: '2.1 kg',
      talla: 'Mediano',
      color_patas: 'Rojo',
      tipo_cresta: 'Rosa',
      sexo: 'Hembra',
      fecha_nacimiento: '2024-05-08',
      placa_padre: 'GAL-001',
      placa_madre: 'GAL-038',
      url_foto: 'https://images.unsplash.com/photo-1598567362494-2764503d2d9f?w=400'
    }
  ]);

  gallos = this.gallosData.asReadonly();

  constructor() { }

  // Simular llamada a API REST - Obtener todos los gallos
  getGallos(): Promise<Gallo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.gallosData());
      }, 500); // Simula latencia de red
    });
  }

  // Simular llamada a API REST - Obtener gallo por placa
  getGalloByPlaca(placa: string): Promise<GalloDetail | undefined> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const gallo = this.gallosData().find(g => g.placa === placa);
        if (!gallo) {
          resolve(undefined);
          return;
        }

        // Crear GalloDetail con padre y madre cargados
        const galloDetail: GalloDetail = {
          ...gallo
        };

        // Cargar padre si existe
        if (gallo.placa_padre) {
          const padre = this.gallosData().find(g => g.placa === gallo.placa_padre);
          galloDetail.padre = padre;
        }

        // Cargar madre si existe
        if (gallo.placa_madre) {
          const madre = this.gallosData().find(g => g.placa === gallo.placa_madre);
          galloDetail.madre = madre;
        }

        resolve(galloDetail);
      }, 300);
    });
  }

  // Simular llamada a API REST - Crear nuevo gallo
  createGallo(gallo: Gallo): Promise<Gallo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.gallosData.update(gallos => [...gallos, gallo]);
        resolve(gallo);
      }, 500);
    });
  }

  // Simular llamada a API REST - Actualizar gallo
  updateGallo(placa: string, galloActualizado: Gallo): Promise<Gallo> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.gallosData().findIndex(g => g.placa === placa);
        if (index !== -1) {
          this.gallosData.update(gallos => {
            const nuevosGallos = [...gallos];
            nuevosGallos[index] = galloActualizado;
            return nuevosGallos;
          });
          resolve(galloActualizado);
        } else {
          reject(new Error('Gallo no encontrado'));
        }
      }, 500);
    });
  }

  // Simular llamada a API REST - Eliminar gallo
  deleteGallo(placa: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.gallosData().findIndex(g => g.placa === placa);
        if (index !== -1) {
          this.gallosData.update(gallos => gallos.filter(g => g.placa !== placa));
          resolve();
        } else {
          reject(new Error('Gallo no encontrado'));
        }
      }, 500);
    });
  }

  // Buscar gallos por placa o nombre
  searchGallos(term: string): Promise<Gallo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const termLower = term.toLowerCase();
        const filtered = this.gallosData().filter(g => 
          g.placa.toLowerCase().includes(termLower) ||
          g.nombre.toLowerCase().includes(termLower)
        );
        resolve(filtered);
      }, 300);
    });
  }
}
