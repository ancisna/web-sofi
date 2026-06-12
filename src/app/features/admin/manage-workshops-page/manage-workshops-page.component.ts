import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { WorkshopService } from '@core/services/workshop.service';
import { Workshop } from '@core/models/workshop.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-workshops-page',
  standalone: true,
  imports: [Button, RouterLink],
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

  deleteWorkshop(id: string): void {
    this.confirmationService.confirm({
      header: 'Eliminar taller',
      message: '¿Seguro que quieres eliminar este taller?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.workshopService.delete(id);
        this.workshops = await this.workshopService.getAll();
        this.messageService.add({
          severity: 'success',
          summary: 'Taller eliminado',
        });
      },
    });
  }

  async cloneWorkshop(id: string): Promise<void> {
    await this.workshopService.clone(id);
    this.workshops = await this.workshopService.getAll();
    this.messageService.add({ severity: 'success', summary: 'Taller clonado' });
  }
}
