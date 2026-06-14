import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { WorkshopService } from '@core/services/workshop.service';
import { Workshop } from '@core/models/workshop.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-workshops-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast, DateEsPipe],
  templateUrl: './manage-workshops-page.component.html',
  styleUrl: './manage-workshops-page.component.css',
})
export class ManageWorkshopsPageComponent implements OnInit {
  private workshopService = inject(WorkshopService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  workshops: Workshop[] = [];

  async ngOnInit() {
    this.workshops = await this.workshopService.getAll();
  }

  deleteWorkshop(workshop: Workshop): void {
    this.confirmationService.confirm({
      header: 'Eliminar taller',
      message: `¿Seguro que quieres eliminar "${workshop.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        await this.workshopService.delete(workshop.id);
        this.workshops = await this.workshopService.getAll();
        this.messageService.add({ severity: 'success', summary: 'Taller eliminado' });
      },
    });
  }

  async toggleActive(workshop: Workshop): Promise<void> {
    await this.workshopService.update(workshop.id, { active: workshop.active });
    this.messageService.add({ severity: 'success', summary: workshop.active ? 'Taller activado' : 'Taller desactivado' });
  }

  async cloneWorkshop(id: string): Promise<void> {
    await this.workshopService.clone(id);
    this.workshops = await this.workshopService.getAll();
    this.messageService.add({ severity: 'success', summary: 'Taller clonado' });
  }
}
