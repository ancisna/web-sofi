import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { TherapyService } from '@core/services/therapy.service';
import { ConstellationService } from '@core/services/constellation.service';
import { WorkshopService } from '@core/services/workshop.service';
import { Therapy, THERAPY_MODALITY_LABELS, TherapyModality } from '@core/models/therapy.model';
import { Constellation, CONSTELLATION_MODALITY_LABELS, ConstellationModality } from '@core/models/constellation.model';
import { Workshop, WorkshopModality, WORKSHOP_MODALITY_LABELS } from '@core/models/workshop.model';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [Button, InfoCardComponent, RouterLink, DateEsPipe, Skeleton],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  private constellationService = inject(ConstellationService);
  private workshopService = inject(WorkshopService);

  therapies: Therapy[] = [];
  constellations: Constellation[] = [];
  workshops: Workshop[] = [];
  loading = true;

  async ngOnInit() {
    [this.therapies, this.constellations, this.workshops] = await Promise.all([
      this.therapyService.getFeatured(),
      this.constellationService.getFeatured(),
      this.workshopService.getFeatured(),
    ]);
    this.loading = false;
  }

  modalityLabel(modalities?: TherapyModality[]): string {
    return modalities?.map(m => THERAPY_MODALITY_LABELS[m]).join(' · ') ?? '';
  }

  constellationModalityLabel(modalities?: ConstellationModality[]): string {
    return modalities?.map(m => CONSTELLATION_MODALITY_LABELS[m]).join(' · ') ?? '';
  }

  workshopModalityLabel(m?: WorkshopModality): string {
    return m ? WORKSHOP_MODALITY_LABELS[m] : '';
  }

  timeRange(start?: string, end?: string): string {
    if (start && end) return `${start} – ${end}`;
    return start ?? end ?? '';
  }
}
