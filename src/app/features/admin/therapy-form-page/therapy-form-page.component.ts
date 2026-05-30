import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';

import { InputText } from 'primeng/inputtext';

import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { TherapyService } from '@core/services/therapy.service';

@Component({
  selector: 'therapy-form-page',

  standalone: true,

  imports: [FormsModule, Button, InputText, Textarea, RouterLink],

  templateUrl: './therapy-form-page.component.html',

  styleUrl: './therapy-form-page.component.css',
})
export class TherapyFormPageComponent {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private therapyService = inject(TherapyService);

  id = this.route.snapshot.paramMap.get('id');

  isEditMode = !!this.id;

  therapy = {
    title: '',
    description: '',
    longDescription: '',
    duration: 60,
    price: 65,
    active: true,
  };

  constructor() {
    if (this.isEditMode && this.id) {
      const existingTherapy = this.therapyService.getById(this.id);

      if (existingTherapy) {
        this.therapy = {
          title: existingTherapy.title,

          description: existingTherapy.description,

          longDescription: existingTherapy.longDescription,

          duration: existingTherapy.duration,

          price: existingTherapy.price ?? 0,

          active: existingTherapy.active,
        };
      }
    }
  }

  save(): void {
    if (this.isEditMode && this.id) {
      this.therapyService.update(
        this.id,

        {
          id: this.id,

          ...this.therapy,
        },
      );
    } else {
      this.therapyService.create({
        id: '',

        ...this.therapy,
      });
    }

    this.router.navigate(['/dashboard/therapies']);
  }
}
