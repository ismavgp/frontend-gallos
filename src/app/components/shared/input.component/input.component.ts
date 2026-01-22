import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  touched: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  get hasError(): boolean {
    return !!(this.ngControl?.invalid && this.touched);
  }

  get errorMessage(): string {
    if (!this.hasError) return '';

    const errors = this.ngControl?.errors;
    if (errors?.['required']) return 'Este campo es requerido';
    if (errors?.['email']) return 'Ingresa un correo válido';
    if (errors?.['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors?.['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    
    return 'Campo inválido';
  }
}
