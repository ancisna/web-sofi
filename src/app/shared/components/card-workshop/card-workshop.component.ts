import { Component, input } from '@angular/core';

@Component({
  selector: 'card-workshop',
  standalone: true,
  imports: [],
  templateUrl: './card-workshop.component.html',
  styleUrl: './card-workshop.component.css',
})
export class CardWorkshopComponent {
  workshop = input.required<{
    title: string;

    date: string;

    price: string;

    description: string;
  }>();
}
