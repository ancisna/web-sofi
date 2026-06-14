import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    MessageModule,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  async onSubmit() {
    this.loading.set(true);
    this.error.set('');

    const { error } = await this.auth.signIn(this.email(), this.password());

    if (error) {
      this.error.set('Email o contraseña incorrectos');
      this.loading.set(false);
      return;
    }

    this.router.navigate(['/dashboard']);
  }
}
