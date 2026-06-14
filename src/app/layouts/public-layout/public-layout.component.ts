import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Button],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }
}
