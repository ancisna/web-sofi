import { Component, inject } from '@angular/core';

import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { InputText } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';

import { TherapyService } from '@core/services/therapy.service';

@Component({
  selector: 'manage-therapies-page',

  standalone: true,

  imports: [Button, Dialog, InputText, FormsModule],

  templateUrl: './manage-therapies-page.component.html',

  styleUrl: './manage-therapies-page.component.css',
})
export class ManageTherapiesPageComponent {
  private therapyService = inject(TherapyService);
  showCreateDialog = false;

  newTherapyTitle = '';

  newTherapyPrice = '';

  therapies = this.therapyService.getAll();
  createTherapy() {
    if (!this.newTherapyTitle.trim()) {
      return;
    }

    this.therapies = [
      ...this.therapies,

      {
        id: crypto.randomUUID(),

        title: this.newTherapyTitle,

        description: 'Nueva terapia creada desde dashboard.',

        longDescription: 'Contenido temporal.',

        duration: 60,

        price: Number(this.newTherapyPrice),

        active: true,
      },
    ];

    this.showCreateDialog = false;

    this.newTherapyTitle = '';

    this.newTherapyPrice = '';
  }
}
