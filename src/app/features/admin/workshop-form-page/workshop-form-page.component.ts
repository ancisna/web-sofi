import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { DatePicker } from 'primeng/datepicker';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WorkshopService } from '@core/services/workshop.service';

@Component({
  selector: 'workshop-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, InputNumber, Textarea, ToggleSwitch, DatePicker, Divider, Toast, RouterLink],
  templateUrl: './workshop-form-page.component.html',
  styleUrl: './workshop-form-page.component.css',
})
export class WorkshopFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workshopService = inject(WorkshopService);
  private messageService = inject(MessageService);

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.id;
  saving = false;

  workshop = {
    title: '',
    description: '',
    longDescription: '',
    price: 35,
    active: true,
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
        };
        this.dateValue = existing.date ? new Date(existing.date) : null;
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.workshop.title.trim().length > 0 &&
      this.workshop.description.trim().length > 0 &&
      this.dateValue !== null &&
      this.workshop.price > 0
    );
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) return;
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
