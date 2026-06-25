import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { ConstellationService } from '@core/services/constellation.service';
import { Constellation } from '@core/models/constellation.model';

@Component({
  selector: 'constellation-detail-page',
  standalone: true,
  imports: [RouterLink, Button, Skeleton],
  templateUrl: './constellation-detail-page.component.html',
  styleUrl: './constellation-detail-page.component.css',
})
export class ConstellationDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private constellationService = inject(ConstellationService);
  constellation: Constellation | undefined;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.constellation = await this.constellationService.getById(id);
    this.loading = false;
  }
}
