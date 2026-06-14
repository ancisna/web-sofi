import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-therapies-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast],
  templateUrl: './manage-therapies-page.component.html',
  styleUrl: './manage-therapies-page.component.css',
})
export class ManageTherapiesPageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  therapies: Therapy[] = [];

  async ngOnInit() {
    this.therapies = await this.therapyService.getAll();
  }

  deleteTherapy(therapy: Therapy): void {
    this.confirmationService.confirm({
      header: 'Eliminar terapia',
      message: `¿Seguro que quieres eliminar "${therapy.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        await this.therapyService.delete(therapy.id);
        this.therapies = await this.therapyService.getAll();
        this.messageService.add({ severity: 'success', summary: 'Terapia eliminada' });
      },
    });
  }

  async toggleActive(therapy: Therapy): Promise<void> {
    await this.therapyService.update(therapy.id, { active: therapy.active });
    this.messageService.add({ severity: 'success', summary: therapy.active ? 'Terapia activada' : 'Terapia desactivada' });
  }

  async cloneTherapy(id: string): Promise<void> {
    await this.therapyService.clone(id);
    this.therapies = await this.therapyService.getAll();
    this.messageService.add({ severity: 'success', summary: 'Terapia clonada' });
  }
}
