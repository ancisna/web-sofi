import { Component, inject, OnInit } from '@angular/core';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { Skeleton } from 'primeng/skeleton';
import { WorkshopService } from '@core/services/workshop.service';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { Workshop, WorkshopModality, WORKSHOP_MODALITY_LABELS } from '@core/models/workshop.model';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'workshops-page',
  standalone: true,
  imports: [InfoCardComponent, PageHeroComponent, DateEsPipe, Skeleton],
  templateUrl: './workshops-page.component.html',
  styleUrl: './workshops-page.component.css',
})
export class WorkshopsPageComponent implements OnInit {
  private workshopService = inject(WorkshopService);
  private seo = inject(SeoService);
  workshops: Workshop[] = [];
  loading = true;

  async ngOnInit() {
    this.seo.set({
      title: 'Talleres',
      description: 'Talleres presenciales de bienestar, crecimiento personal y acompañamiento emocional con Sofía Reyes Psicóloga. Grupos reducidos.',
      url: 'https://sofiareyespsicologa.com/workshops',
    });
    this.workshops = await this.workshopService.getAllActive();
    this.loading = false;
  }

  modalityLabel(m?: WorkshopModality): string {
    return m ? WORKSHOP_MODALITY_LABELS[m] : '';
  }

  timeRange(start?: string, end?: string): string {
    if (start && end) return `${start} – ${end}`;
    return start ?? end ?? '';
  }
}
