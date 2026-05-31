import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

import { WorkshopService } from '@core/services/workshop.service';

import { Workshop } from '@core/models/workshop.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'manage-workshops-page',

  standalone: true,

  imports: [Button, RouterLink],

  templateUrl: './manage-workshops-page.component.html',

  styleUrl: './manage-workshops-page.component.css',
})
export class ManageWorkshopsPageComponent {
  private workshopService = inject(WorkshopService);
  private confirmationService = inject(ConfirmationService);

  workshops: Workshop[] = this.workshopService.getAll();

  deleteWorkshop(id: string): void {
    this.confirmationService.confirm({
      header: 'Eliminar taller',

      message: '¿Seguro que quieres eliminar este taller?',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.workshopService.delete(id);

        this.workshops = this.workshopService.getAll();
      },
    });
  }

  cloneWorkshop(id: string): void {
    this.workshopService.clone(id);

    this.workshops = this.workshopService.getAll();
  }
}
