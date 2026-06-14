import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { TherapyService } from '@core/services/therapy.service';
import { WorkshopService } from '@core/services/workshop.service';
import { Therapy } from '@core/models/therapy.model';
import { Workshop } from '@core/models/workshop.model';
import { supabase } from '@core/supabase/supabase.client';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [Button, InfoCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  private workshopService = inject(WorkshopService);

  therapies: Therapy[] = [];
  workshops: Workshop[] = [];

  async ngOnInit() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log('SESSION:', session?.user?.email ?? 'anonymous');

    this.therapies = await this.therapyService.getFeatured();
    this.workshops = await this.workshopService.getFeatured();

    console.log('THERAPIES:', this.therapies);
    console.log('WORKSHOPS:', this.workshops);
  }
}
