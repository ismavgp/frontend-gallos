import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() disabled: boolean = false;

  checked: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: boolean): void {
    this.checked = value || false;
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

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
  }

  onBlur(): void {
    this.onTouched();
  }
}
