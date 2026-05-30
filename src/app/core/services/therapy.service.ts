import { Injectable } from '@angular/core';

import { Therapy } from '@core/models/therapy.model';

@Injectable({
  providedIn: 'root',
})
export class TherapyService {
  private therapies: Therapy[] = [
    {
      id: '1',

      title: 'Terapia individual',

      description:
        'Espacio terapéutico adaptado a tus necesidades emocionales.',

      longDescription:
        'La terapia individual ofrece un espacio seguro y confidencial para explorar emociones, dificultades, relaciones, ansiedad, autoestima y procesos vitales desde una mirada cercana y profesional.',

      duration: 60,

      price: 65,

      active: true,
    },

    {
      id: '2',

      title: 'Constelaciones familiares',

      description: 'Exploración de dinámicas familiares y relacionales.',

      longDescription:
        'Un trabajo orientado a comprender dinámicas familiares, vínculos y patrones relacionales desde una mirada sistémica.',

      duration: 90,

      price: 80,

      active: true,
    },

    {
      id: '3',

      title: 'Ansiedad y regulación emocional',

      description: 'Acompañamiento para comprender y gestionar la ansiedad.',

      longDescription:
        'Espacio terapéutico centrado en regulación emocional, herramientas prácticas y comprensión profunda de los procesos de ansiedad.',

      duration: 60,

      price: 70,

      active: true,
    },
  ];

  getAll(): Therapy[] {
    return this.therapies;
  }

  getFeatured(): Therapy[] {
    return this.therapies.slice(0, 2);
  }

  getById(id: string): Therapy | undefined {
    return this.therapies.find((therapy) => therapy.id === id);
  }

  create(therapy: Therapy): void {
    this.therapies = [
      {
        ...therapy,

        id: crypto.randomUUID(),
      },

      ...this.therapies,
    ];
  }

  update(id: string, updated: Therapy): void {
    this.therapies = this.therapies.map((therapy) =>
      therapy.id === id
        ? {
            ...updated,

            id,
          }
        : therapy,
    );
  }

  delete(id: string): void {
    this.therapies = this.therapies.filter((therapy) => therapy.id !== id);
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
