import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkshopService } from '@core/services/workshop.service';
import { WorkshopModality } from '@core/models/workshop.model';

@Component({
  selector: 'workshop-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, InputNumber, Textarea, ToggleSwitch, Select, DatePicker, ConfirmDialog, Divider, Toast, RouterLink],
  providers: [ConfirmationService],
  templateUrl: './workshop-form-page.component.html',
  styleUrl: './workshop-form-page.component.css',
})
export class WorkshopFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workshopService = inject(WorkshopService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.id;
  saving = false;

  modalityOptions: { label: string; value: WorkshopModality }[] = [
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
  ];

  workshop: {
    title: string;
    description: string;
    longDescription: string;
    price: number;
    active: boolean;
    modality: WorkshopModality | undefined;
    startTime: string;
    endTime: string;
    location: string;
  } = {
    title: '',
    description: '',
    longDescription: '',
    price: 35,
    active: true,
    modality: undefined,
    startTime: '',
    endTime: '',
    location: '',
  };

  dateValue: Date | null = null;

  async ngOnInit() {
    if (this.isEditMode && this.id) {
      const existing = await this.workshopService.getById(this.id);
      if (existing) {
        this.workshop = {
          title: existing.title,
          description: existing.description,
          longDescription: existing.longDescription,
          price: existing.price ?? 0,
          active: existing.active,
          modality: existing.modality,
          startTime: existing.startTime ?? '',
          endTime: existing.endTime ?? '',
          location: existing.location ?? '',
        };
        this.dateValue = existing.date ? new Date(existing.date) : null;
      }
    }
  }

  isTimeValid(): boolean {
    const { startTime, endTime } = this.workshop;
    if (!startTime || !endTime) return true;
    return startTime < endTime;
  }

  isFormValid(): boolean {
    return (
      this.workshop.title.trim().length > 0 &&
      this.workshop.description.trim().length > 0 &&
      this.dateValue !== null &&
      this.workshop.price > 0 &&
      this.isTimeValid()
    );
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) return;

    if (this.workshop.modality === 'presencial' && !this.workshop.location.trim()) {
      this.confirmationService.confirm({
        header: 'Lugar no especificado',
        message: 'No has indicado el lugar del taller presencial. ¿Deseas continuar sin rellenarlo?',
        icon: 'pi pi-map-marker',
        acceptLabel: 'Sí, continuar',
        rejectLabel: 'Volver y rellenar',
        accept: () => this.doSave(),
      });
      return;
    }

    await this.doSave();
  }

  private async doSave(): Promise<void> {
    this.saving = true;
    const payload = {
      ...this.workshop,
      date: this.dateValue!.toISOString().split('T')[0],
    };
    try {
      if (this.isEditMode && this.id) {
        await this.workshopService.update(this.id, payload);
        this.messageService.add({ severity: 'success', summary: 'Taller actualizado' });
      } else {
        await this.workshopService.create(payload);
        this.messageService.add({ severity: 'success', summary: 'Taller creado' });
      }
      setTimeout(() => this.router.navigate(['/dashboard/workshops']), 1000);
    } finally {
      this.saving = false;
    }
  }
}
