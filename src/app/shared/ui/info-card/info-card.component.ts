import { Component, input } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'info-card',

  standalone: true,

  imports: [RouterLink],

  templateUrl: './info-card.component.html',

  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  badge = input<string>();
  meta = input<string>();
  duration = input<string>();
  price = input<string>();
  modality = input<string>();
  timeRange = input<string>();
  location = input<string>();
  link = input<string>();
  image = input<string | null>();
  bonusSessions = input<number>();
  bonusPrice = input<number>();
}
