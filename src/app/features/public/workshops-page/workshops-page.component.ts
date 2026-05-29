import { Component, signal } from '@angular/core';
import { CardWorkshopComponent } from '@shared/components/card-workshop/card-workshop.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';

@Component({
  selector: 'workshops-page',
  standalone: true,
  imports: [CardWorkshopComponent, PageHeroComponent],
  templateUrl: './workshops-page.component.html',
  styleUrl: './workshops-page.component.css',
})
export class WorkshopsPageComponent {
  workshops = signal([
    {
      title: 'Gestión ansiedad',
      date: '15 Octubre',
      price: '35€',
      description:
        'Taller presencial sobre herramientas para gestionar ansiedad.',
    },
    {
      title: 'Autoestima práctica',
      date: '3 Noviembre',
      price: '30€',
      description: 'Dinámicas y ejercicios para fortalecer autoestima.',
    },
  ]);
}
