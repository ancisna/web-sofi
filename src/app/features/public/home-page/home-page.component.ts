import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { TherapyService } from '@core/services/therapy.service';
import { WorkshopService } from '@core/services/workshop.service';
import { Therapy, TherapyModality } from '@core/models/therapy.model';
import { Workshop, WorkshopModality, WORKSHOP_MODALITY_LABELS } from '@core/models/workshop.model';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';

const MODALITY_LABELS: Record<TherapyModality, string> = {
  online: 'Online',
  presencial: 'Presencial',
  otra: 'Otra',
};

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [Button, InfoCardComponent, RouterLink, DateEsPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  private workshopService = inject(WorkshopService);

  therapies: Therapy[] = [];
  workshops: Workshop[] = [];

  async ngOnInit() {
    this.therapies = await this.therapyService.getFeatured();
    this.workshops = await this.workshopService.getFeatured();
  }

  modalityLabel(m?: TherapyModality): string {
    return m ? MODALITY_LABELS[m] : '';
  }

  workshopModalityLabel(m?: WorkshopModality): string {
    return m ? WORKSHOP_MODALITY_LABELS[m] : '';
  }

  timeRange(start?: string, end?: string): string {
    if (start && end) return `${start} – ${end}`;
    return start ?? end ?? '';
  }
}
