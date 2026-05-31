import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

import { TherapyService } from '@core/services/therapy.service';

import { Therapy } from '@core/models/therapy.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'manage-therapies-page',

  standalone: true,

  imports: [Button, RouterLink],

  templateUrl: './manage-therapies-page.component.html',

  styleUrl: './manage-therapies-page.component.css',
})
export class ManageTherapiesPageComponent {
  private therapyService = inject(TherapyService);
  private confirmationService = inject(ConfirmationService);

  therapies: Therapy[] = this.therapyService.getAll();

  deleteTherapy(id: string): void {
    this.confirmationService.confirm({
      header: 'Eliminar terapia',

      message: '¿Seguro que quieres eliminar esta terapia?',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.therapyService.delete(id);

        this.therapies = this.therapyService.getAll();
      },
    });
  }

  cloneTherapy(id: string): void {
    this.therapyService.clone(id);

    this.therapies = this.therapyService.getAll();
  }
}
