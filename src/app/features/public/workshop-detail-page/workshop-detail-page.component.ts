import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from '@core/services/workshop.service';
import { Workshop } from '@core/models/workshop.model';

@Component({
  selector: 'workshop-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './workshop-detail-page.component.html',
  styleUrl: './workshop-detail-page.component.css',
})
export class WorkshopDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private workshopService = inject(WorkshopService);

  workshop: Workshop | undefined;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.workshop = await this.workshopService.getById(id);
  }
}
