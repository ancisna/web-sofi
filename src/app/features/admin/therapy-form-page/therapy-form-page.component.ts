import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TherapyService } from '@core/services/therapy.service';
import { TherapyModality } from '@core/models/therapy.model';

@Component({
  selector: 'therapy-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, InputNumber, Textarea, ToggleSwitch, Select, Divider, Toast, RouterLink],
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
  saving = false;

  modalityOptions: { label: string; value: TherapyModality }[] = [
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
    { label: 'Otra', value: 'otra' },
  ];

  therapy: {
    title: string;
    description: string;
    longDescription: string;
    duration: number;
    price: number;
    active: boolean;
    modality: TherapyModality | undefined;
    bonusSessions: number | undefined;
    bonusPrice: number | undefined;
  } = {
    title: '',
    description: '',
    longDescription: '',
    duration: 60,
    price: 65,
    active: true,
    modality: undefined,
    bonusSessions: undefined,
    bonusPrice: undefined,
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
          modality: existing.modality,
          bonusSessions: existing.bonusSessions,
          bonusPrice: existing.bonusPrice,
        };
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.therapy.title.trim().length > 0 &&
      this.therapy.description.trim().length > 0 &&
      this.therapy.price > 0 &&
      this.therapy.duration > 0
    );
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) return;
    this.saving = true;
    try {
      if (this.isEditMode && this.id) {
        await this.therapyService.update(this.id, this.therapy);
        this.messageService.add({ severity: 'success', summary: 'Terapia actualizada' });
      } else {
        await this.therapyService.create(this.therapy);
        this.messageService.add({ severity: 'success', summary: 'Terapia creada' });
      }
      setTimeout(() => this.router.navigate(['/dashboard/therapies']), 1000);
    } finally {
      this.saving = false;
    }
  }
}
