import { Injectable } from '@angular/core';

import { Workshop } from '@core/models/workshop.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  getFeatured(): Workshop[] {
    return [
      {
        id: '1',

        title: 'Gestión emocional',
        description:
          'Taller presencial para trabajar herramientas emocionales.',
        date: '15 junio',
        price: 35,
        active: true,
      },

      {
        id: '2',

        title: 'Autoestima y límites',
        description: 'Explorar el autocuidado y las relaciones saludables.',
        date: '22 junio',
        price: 40,
        active: true,
      },
    ];
  }
}
