import { Component, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  // Signals para el estado del componente
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      gallera: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para confirmar contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      // Simular llamada a API
      await this.simulateRegister();
      
      this.successMessage.set('¡Registro exitoso! Redirigiendo...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error) {
      this.errorMessage.set('Error al registrar. Por favor, intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private simulateRegister(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación exitosa
        resolve();
      }, 1500);
    });
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    
    if (!control?.touched) return '';
    
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }

    if (control?.hasError('pattern') && field === 'telefono') {
      return 'Debe ser un teléfono de 10 dígitos';
    }

    if (control?.hasError('passwordMismatch') && field === 'confirmPassword') {
      return 'Las contraseñas no coinciden';
    }
    
    return '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
