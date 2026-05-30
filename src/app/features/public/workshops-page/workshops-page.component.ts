import { Component, signal } from '@angular/core';
import { CardWorkshopComponent } from '@shared/components/card-workshop/card-workshop.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { inject } from '@angular/core';

import { WorkshopService } from '@core/services/workshop.service';

import { Workshop } from '@core/models/workshop.model';

@Component({
  selector: 'workshops-page',
  standalone: true,
  imports: [CardWorkshopComponent, PageHeroComponent],
  templateUrl: './workshops-page.component.html',
  styleUrl: './workshops-page.component.css',
})
export class WorkshopsPageComponent {
  private workshopService = inject(WorkshopService);

  workshops: Workshop[] = this.workshopService.getAll();
}
