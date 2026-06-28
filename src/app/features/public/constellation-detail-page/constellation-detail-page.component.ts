import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { ConstellationService } from '@core/services/constellation.service';
import { Constellation } from '@core/models/constellation.model';
import { SeoService } from '@core/services/seo.service';

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
  private seo = inject(SeoService);
  constellation: Constellation | undefined;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.constellation = await this.constellationService.getById(id);
    if (this.constellation) {
      this.seo.set({
        title: this.constellation.title,
        description: this.constellation.description,
        url: `https://sofiareyespsicologa.com/constellations/${id}`,
      });
    }
    this.loading = false;
  }
}
