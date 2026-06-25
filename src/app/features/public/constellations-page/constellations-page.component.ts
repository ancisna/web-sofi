import { Component, inject, OnInit } from '@angular/core';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { Skeleton } from 'primeng/skeleton';
import { ConstellationService } from '@core/services/constellation.service';
import { Constellation, CONSTELLATION_MODALITY_LABELS, ConstellationModality } from '@core/models/constellation.model';

@Component({
  selector: 'constellations-page',
  standalone: true,
  imports: [InfoCardComponent, PageHeroComponent, Skeleton],
  templateUrl: './constellations-page.component.html',
  styleUrl: './constellations-page.component.css',
})
export class ConstellationsPageComponent implements OnInit {
  private constellationService = inject(ConstellationService);
  constellations: Constellation[] = [];
  loading = true;

  async ngOnInit() {
    this.constellations = await this.constellationService.getAllActive();
    this.loading = false;
  }

  modalityLabel(modalities?: ConstellationModality[]): string {
    return modalities?.map(m => CONSTELLATION_MODALITY_LABELS[m]).join(' · ') ?? '';
  }
}
