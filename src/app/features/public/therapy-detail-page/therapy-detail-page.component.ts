import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { TherapyService } from '@core/services/therapy.service';

import { Therapy } from '@core/models/therapy.model';

@Component({
  selector: 'therapy-detail-page',

  standalone: true,

  imports: [],

  templateUrl: './therapy-detail-page.component.html',

  styleUrl: './therapy-detail-page.component.css',
})
export class TherapyDetailPageComponent {
  private route = inject(ActivatedRoute);

  private therapyService = inject(TherapyService);

  therapy: Therapy | undefined = this.therapyService.getById(
    this.route.snapshot.paramMap.get('id') ?? '',
  );
}
