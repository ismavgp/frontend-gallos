import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterLink
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  // Signals para el estado del componente
  hidePassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      // Simular llamada a API
      await this.simulateLogin();
      
      // Si el login es exitoso, redirigir
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage.set('Credenciales incorrectas. Por favor, intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private simulateLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        // Simulación: acepta cualquier email válido con password de mínimo 6 caracteres
        if (email && password && password.length >= 6) {
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
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
    
    return '';
  }
}
