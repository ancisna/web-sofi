import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { Skeleton } from 'primeng/skeleton';
import { ConstellationService } from '@core/services/constellation.service';
import { Constellation, CONSTELLATION_MODALITY_LABELS, ConstellationModality } from '@core/models/constellation.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-constellations-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast, Tooltip, Skeleton],
  templateUrl: './manage-constellations-page.component.html',
  styleUrls: ['../manage-list.css', './manage-constellations-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManageConstellationsPageComponent implements OnInit {
  private constellationService = inject(ConstellationService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  constellations: Constellation[] = [];
  loading = true;

  async ngOnInit() {
    this.constellations = await this.constellationService.getAll();
    this.loading = false;
  }

  modalityLabel(m: ConstellationModality): string {
    return CONSTELLATION_MODALITY_LABELS[m];
  }

  deleteConstellation(c: Constellation): void {
    this.confirmationService.confirm({
      header: 'Eliminar constelación',
      message: `¿Seguro que quieres eliminar "${c.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const prev = this.constellations;
        this.constellations = this.constellations.filter(x => x.id !== c.id);
        try {
          await this.constellationService.delete(c.id);
          this.messageService.add({ severity: 'success', summary: 'Constelación eliminada' });
        } catch {
          this.constellations = prev;
          this.messageService.add({ severity: 'error', summary: 'Error al eliminar' });
        }
      },
    });
  }

  async toggleActive(c: Constellation): Promise<void> {
    try {
      await this.constellationService.update(c.id, { active: c.active });
      this.messageService.add({ severity: 'success', summary: c.active ? 'Constelación activada' : 'Constelación desactivada' });
    } catch {
      c.active = !c.active;
      this.messageService.add({ severity: 'error', summary: 'Error al actualizar estado' });
    }
  }

  async cloneConstellation(id: string): Promise<void> {
    try {
      await this.constellationService.clone(id);
      this.constellations = await this.constellationService.getAll();
      this.messageService.add({ severity: 'success', summary: 'Constelación clonada' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error al clonar' });
    }
  }
}
