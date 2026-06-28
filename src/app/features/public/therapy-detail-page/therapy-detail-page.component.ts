import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'therapy-detail-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, Skeleton],
  templateUrl: './therapy-detail-page.component.html',
  styleUrl: './therapy-detail-page.component.css',
})
export class TherapyDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private therapyService = inject(TherapyService);
  private seo = inject(SeoService);

  therapy: Therapy | undefined;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.therapy = await this.therapyService.getById(id);
    if (this.therapy) {
      this.seo.set({
        title: this.therapy.title,
        description: this.therapy.description,
        url: `https://sofiareyespsicologa.com/therapies/${id}`,
      });
    }
    this.loading = false;
  }
}
