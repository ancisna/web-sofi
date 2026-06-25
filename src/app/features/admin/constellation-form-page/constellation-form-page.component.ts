import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { MultiSelect } from 'primeng/multiselect';
import { ProgressSpinner } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ConstellationService } from '@core/services/constellation.service';
import { ConstellationModality } from '@core/models/constellation.model';

@Component({
  selector: 'constellation-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, InputNumber, Textarea, ToggleSwitch, Divider, Toast, MultiSelect, ProgressSpinner, RouterLink],
  templateUrl: './constellation-form-page.component.html',
  styleUrl: './constellation-form-page.component.css',
})
export class ConstellationFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private constellationService = inject(ConstellationService);
  private messageService = inject(MessageService);

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.id;
  saving = false;
  loading = this.isEditMode;

  modalityOptions: { label: string; value: ConstellationModality }[] = [
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
    { label: 'Otra', value: 'otra' },
    { label: 'Próximamente', value: 'proximamente' },
  ];

  constellation: {
    title: string;
    description: string;
    longDescription: string;
    duration: number;
    price: number;
    active: boolean;
    modalities: ConstellationModality[];
  } = {
    title: '',
    description: '',
    longDescription: '',
    duration: 90,
    price: 80,
    active: true,
    modalities: [],
  };

  async ngOnInit() {
    if (this.isEditMode && this.id) {
      const existing = await this.constellationService.getById(this.id);
      if (existing) {
        this.constellation = {
          title: existing.title,
          description: existing.description,
          longDescription: existing.longDescription,
          duration: existing.duration,
          price: existing.price ?? 0,
          active: existing.active,
          modalities: existing.modalities ?? [],
        };
      }
      this.loading = false;
    }
  }

  isFormValid(): boolean {
    return (
      this.constellation.title.trim().length > 0 &&
      this.constellation.description.trim().length > 0 &&
      this.constellation.price > 0 &&
      this.constellation.duration > 0
    );
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) return;
    this.saving = true;
    try {
      if (this.isEditMode && this.id) {
        await this.constellationService.update(this.id, this.constellation);
        this.messageService.add({ severity: 'success', summary: 'Constelación actualizada' });
      } else {
        await this.constellationService.create(this.constellation);
        this.messageService.add({ severity: 'success', summary: 'Constelación creada' });
      }
      setTimeout(() => this.router.navigate(['/dashboard/constellations']), 1000);
    } catch (err: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al guardar',
        detail: err?.message ?? 'Error desconocido',
        life: 8000,
      });
    } finally {
      this.saving = false;
    }
  }
}
