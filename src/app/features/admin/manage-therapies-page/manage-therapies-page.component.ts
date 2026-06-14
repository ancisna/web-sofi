import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'manage-therapies-page',
  standalone: true,
  imports: [Button, RouterLink, ConfirmDialog, Toast],
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

  deleteTherapy(id: string): void {
    this.confirmationService.confirm({
      header: 'Eliminar terapia',
      message: '¿Seguro que quieres eliminar esta terapia?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.therapyService.delete(id);
        this.therapies = await this.therapyService.getAll();
        this.messageService.add({ severity: 'success', summary: 'Terapia eliminada' });
      },
    });
  }

  async cloneTherapy(id: string): Promise<void> {
    await this.therapyService.clone(id);
    this.therapies = await this.therapyService.getAll();
    this.messageService.add({ severity: 'success', summary: 'Terapia clonada' });
  }
}
