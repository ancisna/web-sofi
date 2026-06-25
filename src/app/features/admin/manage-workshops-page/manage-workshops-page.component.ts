import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { WorkshopService } from '@core/services/workshop.service';
import { Workshop } from '@core/models/workshop.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-workshops-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast, DateEsPipe, Tooltip, Skeleton],
  templateUrl: './manage-workshops-page.component.html',
  styleUrls: ['../manage-list.css', './manage-workshops-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManageWorkshopsPageComponent implements OnInit {
  private workshopService = inject(WorkshopService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  workshops: Workshop[] = [];
  loading = true;

  async ngOnInit() {
    this.workshops = await this.workshopService.getAll();
    this.loading = false;
  }

  deleteWorkshop(workshop: Workshop): void {
    this.confirmationService.confirm({
      header: 'Eliminar taller',
      message: `¿Seguro que quieres eliminar "${workshop.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const prev = this.workshops;
        this.workshops = this.workshops.filter(w => w.id !== workshop.id);
        try {
          await this.workshopService.delete(workshop.id);
          this.messageService.add({ severity: 'success', summary: 'Taller eliminado' });
        } catch {
          this.workshops = prev;
          this.messageService.add({ severity: 'error', summary: 'Error al eliminar' });
        }
      },
    });
  }

  async toggleActive(workshop: Workshop): Promise<void> {
    try {
      await this.workshopService.update(workshop.id, { active: workshop.active });
      this.messageService.add({ severity: 'success', summary: workshop.active ? 'Taller activado' : 'Taller desactivado' });
    } catch {
      workshop.active = !workshop.active;
      this.messageService.add({ severity: 'error', summary: 'Error al actualizar estado' });
    }
  }

  async cloneWorkshop(id: string): Promise<void> {
    try {
      await this.workshopService.clone(id);
      this.workshops = await this.workshopService.getAll();
      this.messageService.add({ severity: 'success', summary: 'Taller clonado' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error al clonar' });
    }
  }
}
