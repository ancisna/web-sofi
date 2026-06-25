import { Component, inject, OnInit } from '@angular/core';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { Skeleton } from 'primeng/skeleton';
import { TherapyService } from '@core/services/therapy.service';
import { computeBonusPrice, Therapy, THERAPY_MODALITY_LABELS, TherapyModality } from '@core/models/therapy.model';

@Component({
  selector: 'therapies-page',
  standalone: true,
  imports: [InfoCardComponent, PageHeroComponent, Skeleton],
  templateUrl: './therapies-page.component.html',
  styleUrl: './therapies-page.component.css',
})
export class TherapiesPageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  therapies: Therapy[] = [];
  loading = true;

  async ngOnInit() {
    this.therapies = await this.therapyService.getAllActive();
    this.loading = false;
  }

  modalityLabel(modalities?: TherapyModality[]): string {
    return modalities?.map(m => THERAPY_MODALITY_LABELS[m]).join(' · ') ?? '';
  }

  bonusPrice(t: Therapy): number | undefined {
    return computeBonusPrice(t);
  }
}
