import { Component, signal } from '@angular/core';

import { CardTherapyComponent } from '@shared/components/card-therapy/card-therapy.component';

@Component({
  selector: 'therapies-page',
  standalone: true,
  imports: [CardTherapyComponent],
  templateUrl: './therapies-page.component.html',
  styleUrl: './therapies-page.component.css',
})
export class TherapiesPageComponent {
  therapies = signal([
    {
      title: 'Ansiedad',
      duration: '60 min',
      price: '60€',
      description:
        'Trabajo terapéutico para ansiedad, estrés y regulación emocional.',
    },
    {
      title: 'Autoestima',
      duration: '60 min',
      price: '55€',
      description:
        'Acompañamiento psicológico para fortalecer autoestima y autoconcepto.',
    },
    {
      title: 'Terapia adolescentes',
      duration: '50 min',
      price: '65€',
      description:
        'Espacio terapéutico adaptado a adolescencia y desarrollo emocional.',
    },
  ]);
}
