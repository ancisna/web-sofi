import { Component, inject, signal, OnInit } from '@angular/core';
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
export class LoginPageComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  async ngOnInit() {
    // Wait for auth state to be determined
    if (this.auth.loading()) {
      await new Promise<void>(resolve => {
        const id = setInterval(() => {
          if (!this.auth.loading()) { clearInterval(id); resolve(); }
        }, 30);
      });
    }
    if (this.auth.user()) {
      this.router.navigate(['/dashboard']);
    }
  }

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
