import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

import { TherapyService } from '@core/services/therapy.service';

import { Therapy } from '@core/models/therapy.model';

@Component({
  selector: 'manage-therapies-page',

  standalone: true,

  imports: [Button, RouterLink],

  templateUrl: './manage-therapies-page.component.html',

  styleUrl: './manage-therapies-page.component.css',
})
export class ManageTherapiesPageComponent {
  private therapyService = inject(TherapyService);

  therapies: Therapy[] = this.therapyService.getAll();

  deleteTherapy(id: string): void {
    this.therapyService.delete(id);

    this.therapies = this.therapyService.getAll();
  }

  cloneTherapy(id: string): void {
    this.therapyService.clone(id);

    this.therapies = this.therapyService.getAll();
  }
}
