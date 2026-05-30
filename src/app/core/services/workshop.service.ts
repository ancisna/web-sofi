import { Injectable } from '@angular/core';

import { Workshop } from '@core/models/workshop.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  private workshops: Workshop[] = [
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

  getAll(): Workshop[] {
    return this.workshops;
  }

  getFeatured(): Workshop[] {
    return this.workshops.slice(0, 2);
  }

  getById(id: string): Workshop | undefined {
    return this.workshops.find((workshop) => workshop.id === id);
  }

  create(workshop: Workshop): void {
    this.workshops = [
      {
        ...workshop,

        id: crypto.randomUUID(),
      },

      ...this.workshops,
    ];
  }

  update(id: string, updated: Workshop): void {
    this.workshops = this.workshops.map((workshop) =>
      workshop.id === id
        ? {
            ...updated,

            id,
          }
        : workshop,
    );
  }

  delete(id: string): void {
    this.workshops = this.workshops.filter((workshop) => workshop.id !== id);
  }

  clone(id: string): void {
    const original = this.getById(id);

    if (!original) {
      return;
    }

    this.create({
      ...original,

      title: `${original.title} (Copia)`,
    });
  }
}
