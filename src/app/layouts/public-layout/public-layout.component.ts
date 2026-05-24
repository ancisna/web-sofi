import { Component, signal } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { Button } from 'primeng/button';

@Component({
  selector: 'public-layout',
  standalone: true,

  imports: [RouterOutlet, RouterLink, Button],

  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }
}
