import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { MessageService } from 'primeng/api';
import { TherapyService } from '@core/services/therapy.service';

@Component({
  selector: 'therapy-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, Textarea, ToggleSwitch, RouterLink],
  templateUrl: './therapy-form-page.component.html',
  styleUrl: './therapy-form-page.component.css',
})
export class TherapyFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private therapyService = inject(TherapyService);
  private messageService = inject(MessageService);

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

  async ngOnInit() {
    if (this.isEditMode && this.id) {
      const existing = await this.therapyService.getById(this.id);
      if (existing) {
        this.therapy = {
          title: existing.title,
          description: existing.description,
          longDescription: existing.longDescription,
          duration: existing.duration,
          price: existing.price ?? 0,
          active: existing.active,
        };
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.therapy.title.trim().length > 0 &&
      this.therapy.description.trim().length > 0 &&
      this.therapy.price > 0
    );
  }

  async save(): Promise<void> {
    if (this.isEditMode && this.id) {
      await this.therapyService.update(this.id, this.therapy);
      this.messageService.add({
        severity: 'success',
        summary: 'Terapia actualizada',
      });
    } else {
      await this.therapyService.create(this.therapy);
      this.messageService.add({
        severity: 'success',
        summary: 'Terapia creada',
      });
    }
    this.router.navigate(['/dashboard/therapies']);
  }
}
