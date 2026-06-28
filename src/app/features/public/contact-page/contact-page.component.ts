import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [Button, PageHeroComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title: 'Contacto',
      description: 'Reserva tu sesión o consulta cualquier duda. WhatsApp: 681 998 181 · sofiam.reyes.roson@gmail.com',
      url: 'https://sofiareyespsicologa.com/contact',
    });
  }
}
