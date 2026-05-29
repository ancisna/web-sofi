import { Component, inject } from '@angular/core';

import { TherapyService } from '@core/services/therapy.service';

import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';

import { Therapy } from '@core/models/therapy.model';

@Component({
  selector: 'therapies-page',

  standalone: true,

  imports: [InfoCardComponent, PageHeroComponent],

  templateUrl: './therapies-page.component.html',

  styleUrl: './therapies-page.component.css',
})
export class TherapiesPageComponent {
  private therapyService = inject(TherapyService);

  therapies: Therapy[] = this.therapyService.getAll();
}
