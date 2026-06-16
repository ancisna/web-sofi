import { Component, inject, OnInit } from '@angular/core';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { WorkshopService } from '@core/services/workshop.service';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { Workshop, WorkshopModality, WORKSHOP_MODALITY_LABELS } from '@core/models/workshop.model';

@Component({
  selector: 'workshops-page',
  standalone: true,
  imports: [InfoCardComponent, PageHeroComponent, DateEsPipe],
  templateUrl: './workshops-page.component.html',
  styleUrl: './workshops-page.component.css',
})
export class WorkshopsPageComponent implements OnInit {
  private workshopService = inject(WorkshopService);
  workshops: Workshop[] = [];

  async ngOnInit() {
    this.workshops = await this.workshopService.getAllActive();
  }

  modalityLabel(m?: WorkshopModality): string {
    return m ? WORKSHOP_MODALITY_LABELS[m] : '';
  }

  timeRange(start?: string, end?: string): string {
    if (start && end) return `${start} – ${end}`;
    return start ?? end ?? '';
  }
}
