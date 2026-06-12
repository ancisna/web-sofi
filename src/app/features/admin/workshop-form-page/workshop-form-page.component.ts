import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { MessageService } from 'primeng/api';
import { WorkshopService } from '@core/services/workshop.service';

@Component({
  selector: 'workshop-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, Textarea, ToggleSwitch, RouterLink],
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

  workshop = {
    title: '',
    description: '',
    longDescription: '',
    date: '',
    price: 35,
    active: true,
  };

  async ngOnInit() {
    if (this.isEditMode && this.id) {
      const existing = await this.workshopService.getById(this.id);
      if (existing) {
        this.workshop = {
          title: existing.title,
          description: existing.description,
          longDescription: existing.longDescription,
          date: existing.date,
          price: existing.price ?? 0,
          active: existing.active,
        };
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.workshop.title.trim().length > 0 &&
      this.workshop.description.trim().length > 0 &&
      this.workshop.date.trim().length > 0 &&
      this.workshop.price > 0
    );
  }

  async save(): Promise<void> {
    if (this.isEditMode && this.id) {
      await this.workshopService.update(this.id, this.workshop);
      this.messageService.add({
        severity: 'success',
        summary: 'Taller actualizado',
      });
    } else {
      await this.workshopService.create(this.workshop);
      this.messageService.add({
        severity: 'success',
        summary: 'Taller creado',
      });
    }
    this.router.navigate(['/dashboard/workshops']);
  }
}
