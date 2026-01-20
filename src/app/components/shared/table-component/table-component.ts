import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'number' | 'badge' | 'custom';
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
}

export interface TableAction {
  icon: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  onClick: (row: any) => void;
  show?: (row: any) => boolean;
}

@Component({
  selector: 'app-table-component',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.css',
  standalone: true
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() emptyMessage: string = 'No hay datos para mostrar';
  @Input() loading: boolean = false;
  @Input() striped: boolean = true;
  @Input() hoverable: boolean = true;
  @Input() actionsPosition: 'start' | 'end' = 'end';

  @Output() rowClick = new EventEmitter<any>();

  get displayedColumns(): string[] {
    const cols = this.columns.map(col => col.key);
    if (this.actions.length > 0) {
      if (this.actionsPosition === 'start') {
        cols.unshift('actions');
      } else {
        cols.push('actions');
      }
    }
    return cols;
  }

  getCellValue(row: any, column: TableColumn): any {
    const value = row[column.key];
    
    if (column.format) {
      return column.format(value);
    }

    if (!value) return '-';

    switch (column.type) {
      case 'date':
        return this.formatDate(value);
      case 'number':
        return this.formatNumber(value);
      default:
        return value;
    }
  }

  formatDate(date: string): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES');
  }

  formatNumber(num: any): string {
    if (!num) return '-';
    return new Intl.NumberFormat('es-ES').format(num);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  shouldShowAction(action: TableAction, row: any): boolean {
    if (action.show) {
      return action.show(row);
    }
    return true;
  }

  executeAction(action: TableAction, row: any, event: Event): void {
    event.stopPropagation();
    action.onClick(row);
  }
}
