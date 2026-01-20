import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../components/shared/dialog-component/dialog-component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre un dialog genérico
   */
  open(data: DialogData): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '400px',
      data: data,
      disableClose: false
    });
  }

  /**
   * Abre un dialog de confirmación
   */
  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      type: 'confirm'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de confirmación de eliminación
   */
  confirmDelete(itemName: string, customMessage?: string): Observable<boolean> {
    const message = customMessage || `¿Estás seguro de que deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`;
    
    const dialogRef = this.open({
      title: 'Confirmar eliminación',
      message,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'delete'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de alerta
   */
  alert(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Aceptar',
      cancelText: 'Cerrar',
      type: 'alert'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de error
   */
  error(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Aceptar',
      cancelText: 'Cerrar',
      type: 'error'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de advertencia
   */
  warning(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Entendido',
      cancelText: 'Cancelar',
      type: 'warning'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de éxito
   */
  success(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Aceptar',
      cancelText: 'Cerrar',
      type: 'success'
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre un dialog de información
   */
  info(title: string, message: string): Observable<boolean> {
    const dialogRef = this.open({
      title,
      message,
      confirmText: 'Aceptar',
      cancelText: 'Cerrar',
      type: 'info'
    });

    return dialogRef.afterClosed();
  }
}
