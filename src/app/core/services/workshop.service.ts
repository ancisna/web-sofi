import { Injectable } from '@angular/core';

import { Workshop } from '@core/models/workshop.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  // getFeatured(): Workshop[] {
  //   return [
  //     {
  //       id: '1',

  //       title: 'Gestión emocional',
  //       description:
  //         'Taller presencial para trabajar herramientas emocionales.',
  //       date: '15 junio',
  //       price: 35,
  //       active: true,
  //     },

  //     {
  //       id: '2',

  //       title: 'Autoestima y límites',
  //       description: 'Explorar el autocuidado y las relaciones saludables.',
  //       date: '22 junio',
  //       price: 40,
  //       active: true,
  //     },
  //   ];
  // }
  getAll(): Workshop[] {
    return [
      {
        id: '1',

        title: 'Gestión emocional',

        description: 'Herramientas para comprender y regular emociones.',

        longDescription:
          'Taller presencial orientado a explorar emociones, autocuidado y herramientas prácticas para la vida cotidiana.',

        date: '15 junio',

        price: 35,

        active: true,
      },

      {
        id: '2',

        title: 'Autoestima y límites',

        description: 'Explorar relaciones saludables y autocuidado.',

        longDescription:
          'Un espacio grupal para revisar autoestima, límites personales y dinámicas relacionales.',

        date: '22 junio',

        price: 40,

        active: true,
      },
    ];
  }

  getFeatured(): Workshop[] {
    return this.getAll().slice(0, 2);
  }

  getById(id: string): Workshop | undefined {
    return this.getAll().find((workshop) => workshop.id === id);
  }
}
