import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface DialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'confirm' | 'alert' | 'delete' | 'warning' | 'error' | 'success' | 'info';
}

@Component({
  selector: 'app-dialog-component',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.css',
  standalone: true
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Establecer valores predeterminados
    this.data.confirmText = data.confirmText || 'Confirmar';
    this.data.cancelText = data.cancelText || 'Cancelar';
    this.data.type = data.type || 'confirm';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getIcon(): string {
    const iconMap: Record<string, string> = {
      'delete': 'delete_forever',
      'error': 'error',
      'warning': 'warning',
      'alert': 'info',
      'success': 'check_circle',
      'confirm': 'help',
      'info': 'info'
    };
    return iconMap[this.data.type || 'confirm'] || 'help';
  }
}
