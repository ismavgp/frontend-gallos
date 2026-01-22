import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/button.component/button.component';
import { InputComponent } from '../shared/input.component/input.component';
import { CheckboxComponent } from '../shared/checkbox.component/checkbox.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CheckboxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  emailIcon = 'fas fa-envelope';
  passwordIcon = 'fas fa-lock';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['ismael@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      // El AuthService espera username, no email
      const success = await this.authService.login(email, password);
      
      if (success) {
        console.log('Login successful - Redirecting to home...');
        await this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Intenta con admin / password';
      }
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
