import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'therapy-detail-page',
  standalone: true,
  imports: [Button],
  templateUrl: './therapy-detail-page.component.html',
  styleUrl: './therapy-detail-page.component.css',
})
export class TherapyDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private therapyService = inject(TherapyService);

  therapy: Therapy | undefined;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.therapy = await this.therapyService.getById(id);
  }
}
