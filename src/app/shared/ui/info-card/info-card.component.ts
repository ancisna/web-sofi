import { Component, input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

@Component({
  selector: 'info-card',

  standalone: true,

  imports: [Button, RouterLink],

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

  link = input<string>();
}
