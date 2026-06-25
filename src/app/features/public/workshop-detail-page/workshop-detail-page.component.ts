import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { WorkshopService } from '@core/services/workshop.service';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { Workshop } from '@core/models/workshop.model';

@Component({
  selector: 'workshop-detail-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, DateEsPipe, Skeleton],
  templateUrl: './workshop-detail-page.component.html',
  styleUrl: './workshop-detail-page.component.css',
})
export class WorkshopDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private workshopService = inject(WorkshopService);

  workshop: Workshop | undefined;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.workshop = await this.workshopService.getById(id);
    this.loading = false;
  }
}
