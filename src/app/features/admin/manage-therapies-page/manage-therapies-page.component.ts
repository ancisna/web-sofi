import { Component, inject } from '@angular/core';

import { Button } from 'primeng/button';

import { TherapyService } from '@core/services/therapy.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'manage-therapies-page',

  standalone: true,

  imports: [Button, RouterLink],

  templateUrl: './manage-therapies-page.component.html',

  styleUrl: './manage-therapies-page.component.css',
})
export class ManageTherapiesPageComponent {
  private therapyService = inject(TherapyService);
  showCreateDialog = false;

  newTherapyTitle = '';

  newTherapyPrice = '';

  therapies = this.therapyService.getAll();
  deleteTherapy(id: string) {
    this.therapies = this.therapies.filter((therapy) => therapy.id !== id);
  }

  cloneTherapy(id: string) {
    const original = this.therapies.find((therapy) => therapy.id === id);

    if (!original) {
      return;
    }

    const cloned = {
      ...original,

      id: crypto.randomUUID(),

      title: `${original.title} (Copia)`,
    };

    this.therapies = [cloned, ...this.therapies];
  }
}
