import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';

import { InputText } from 'primeng/inputtext';

import { Textarea } from 'primeng/textarea';

import { ToggleSwitch } from 'primeng/toggleswitch';

import { WorkshopService } from '@core/services/workshop.service';

@Component({
  selector: 'workshop-form-page',

  standalone: true,

  imports: [FormsModule, Button, InputText, Textarea, ToggleSwitch, RouterLink],

  templateUrl: './workshop-form-page.component.html',

  styleUrl: './workshop-form-page.component.css',
})
export class WorkshopFormPageComponent {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private workshopService = inject(WorkshopService);

  id = this.route.snapshot.paramMap.get('id');

  isEditMode = !!this.id;

  workshop = {
    title: '',

    description: '',

    longDescription: '',

    date: '',

    price: 35,

    active: true,
  };

  constructor() {
    if (this.isEditMode && this.id) {
      const existingWorkshop = this.workshopService.getById(this.id);

      if (existingWorkshop) {
        this.workshop = {
          title: existingWorkshop.title,

          description: existingWorkshop.description,

          longDescription: existingWorkshop.longDescription,

          date: existingWorkshop.date,

          price: existingWorkshop.price ?? 0,

          active: existingWorkshop.active,
        };
      }
    }
  }

  save(): void {
    if (this.isEditMode && this.id) {
      this.workshopService.update(
        this.id,

        {
          id: this.id,

          ...this.workshop,
        },
      );
    } else {
      this.workshopService.create({
        id: '',

        ...this.workshop,
      });
    }

    this.router.navigate(['/dashboard/workshops']);
  }
}
