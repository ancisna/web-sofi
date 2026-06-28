import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Sobre mí',
      description: 'Soy Sofía Reyes, psicóloga con enfoque integrador centrado en la persona. Acompañamiento emocional cercano, humano y profesional.',
      url: 'https://sofiareyespsicologa.com/about',
    });
  }
}
