import { Injectable } from '@angular/core';

import { Therapy } from '@core/models/therapy.model';

@Injectable({
  providedIn: 'root',
})
export class TherapyService {
  getFeatured(): Therapy[] {
    return [
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
        description: 'Exploración de dinámicas relacionales y familiares.',
        longDescription:
          'La terapia individual ofrece un espacio seguro y confidencial para explorar emociones, dificultades, relaciones, ansiedad, autoestima y procesos vitales desde una mirada cercana y profesional.',
        duration: 90,
        price: 80,
        active: true,
      },
    ];
  }
  getAll(): Therapy[] {
    return [
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
          'La terapia individual ofrece un espacio seguro y confidencial para explorar emociones, dificultades, relaciones, ansiedad, autoestima y procesos vitales desde una mirada cercana y profesional.',
        duration: 90,
        price: 80,
        active: true,
      },

      {
        id: '3',
        title: 'Ansiedad y regulación emocional',
        description: 'Acompañamiento para comprender y gestionar la ansiedad.',
        longDescription:
          'La terapia individual ofrece un espacio seguro y confidencial para explorar emociones, dificultades, relaciones, ansiedad, autoestima y procesos vitales desde una mirada cercana y profesional.',

        duration: 60,
        price: 70,
        active: true,
      },
    ];
  }
  getById(id: string): Therapy | undefined {
    return this.getAll().find((therapy) => therapy.id === id);
  }
}
