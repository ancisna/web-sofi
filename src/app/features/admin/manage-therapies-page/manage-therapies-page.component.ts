import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy, THERAPY_MODALITY_LABELS, TherapyModality } from '@core/models/therapy.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-therapies-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast, Tooltip, Skeleton],
  templateUrl: './manage-therapies-page.component.html',
  styleUrls: ['../manage-list.css', './manage-therapies-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManageTherapiesPageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  therapies: Therapy[] = [];
  loading = true;

  async ngOnInit() {
    this.therapies = await this.therapyService.getAll();
    this.loading = false;
  }

  modalityLabel(m: TherapyModality): string {
    return THERAPY_MODALITY_LABELS[m];
  }

  deleteTherapy(therapy: Therapy): void {
    this.confirmationService.confirm({
      header: 'Eliminar terapia',
      message: `¿Seguro que quieres eliminar "${therapy.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const prev = this.therapies;
        this.therapies = this.therapies.filter(t => t.id !== therapy.id);
        try {
          await this.therapyService.delete(therapy.id);
          this.messageService.add({ severity: 'success', summary: 'Terapia eliminada' });
        } catch {
          this.therapies = prev;
          this.messageService.add({ severity: 'error', summary: 'Error al eliminar' });
        }
      },
    });
  }

  async toggleActive(therapy: Therapy): Promise<void> {
    try {
      await this.therapyService.update(therapy.id, { active: therapy.active });
      this.messageService.add({ severity: 'success', summary: therapy.active ? 'Terapia activada' : 'Terapia desactivada' });
    } catch {
      therapy.active = !therapy.active;
      this.messageService.add({ severity: 'error', summary: 'Error al actualizar estado' });
    }
  }

  async cloneTherapy(id: string): Promise<void> {
    try {
      await this.therapyService.clone(id);
      this.therapies = await this.therapyService.getAll();
      this.messageService.add({ severity: 'success', summary: 'Terapia clonada' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error al clonar' });
    }
  }
}
