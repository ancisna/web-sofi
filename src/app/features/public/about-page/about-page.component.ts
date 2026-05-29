import { Component } from '@angular/core';

import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';

@Component({
  selector: 'about-page',

  standalone: true,

  imports: [PageHeroComponent],

  templateUrl: './about-page.component.html',

  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {}
