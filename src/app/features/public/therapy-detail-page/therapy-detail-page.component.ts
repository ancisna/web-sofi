import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';

@Component({
  selector: 'therapy-detail-page',
  standalone: true,
  imports: [RouterLink, ButtonModule],
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
