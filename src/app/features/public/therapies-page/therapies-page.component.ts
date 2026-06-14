import { Component, inject, OnInit } from '@angular/core';
import { InfoCardComponent } from '@shared/ui/info-card/info-card.component';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { TherapyService } from '@core/services/therapy.service';
import { Therapy } from '@core/models/therapy.model';

@Component({
  selector: 'therapies-page',
  standalone: true,
  imports: [InfoCardComponent, PageHeroComponent],
  templateUrl: './therapies-page.component.html',
  styleUrl: './therapies-page.component.css',
})
export class TherapiesPageComponent implements OnInit {
  private therapyService = inject(TherapyService);
  therapies: Therapy[] = [];

  async ngOnInit() {
    this.therapies = await this.therapyService.getAllActive();
  }
}
