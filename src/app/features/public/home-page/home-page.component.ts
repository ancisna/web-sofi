import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TherapyService } from '@core/services/therapy.service';
import { WorkshopService } from '@core/services/workshop.service';

import { Workshop } from '@core/models/workshop.model';
import { Therapy } from '@core/models/therapy.model';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [Button, InfoCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private therapyService = inject(TherapyService);
  private workshopService = inject(WorkshopService);
  workshops: Workshop[] = this.workshopService.getFeatured();
  therapies: Therapy[] = this.therapyService.getFeatured();
}
