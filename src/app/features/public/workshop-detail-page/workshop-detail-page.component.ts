import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { WorkshopService } from '@core/services/workshop.service';

@Component({
  selector: 'workshop-detail-page',

  standalone: true,

  imports: [],

  templateUrl: './workshop-detail-page.component.html',

  styleUrl: './workshop-detail-page.component.css',
})
export class WorkshopDetailPageComponent {
  private route = inject(ActivatedRoute);

  private workshopService = inject(WorkshopService);

  workshop = this.workshopService.getById(
    this.route.snapshot.paramMap.get('id') ?? '',
  );
}
