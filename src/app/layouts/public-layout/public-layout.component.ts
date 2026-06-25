import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthService } from '@core/services/auth.service';
import { TherapyService } from '@core/services/therapy.service';
import { ConstellationService } from '@core/services/constellation.service';
import { WorkshopService } from '@core/services/workshop.service';
import { ArticleService } from '@core/services/article.service';

@Component({
  selector: 'public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Button],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent implements OnInit {
  auth = inject(AuthService);
  private router = inject(Router);
  private therapyService = inject(TherapyService);
  private constellationService = inject(ConstellationService);
  private workshopService = inject(WorkshopService);
  private articleService = inject(ArticleService);

  mobileMenuOpen = signal(false);
  hasTherapies = signal(false);
  hasConstellations = signal(false);
  hasWorkshops = signal(false);
  hasArticles = signal(false);

  async ngOnInit() {
    const [t, c, w, a] = await Promise.all([
      this.therapyService.hasActive(),
      this.constellationService.hasActive(),
      this.workshopService.hasActive(),
      this.articleService.hasPublished(),
    ]);
    this.hasTherapies.set(t);
    this.hasConstellations.set(c);
    this.hasWorkshops.set(w);
    this.hasArticles.set(a);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }
}
