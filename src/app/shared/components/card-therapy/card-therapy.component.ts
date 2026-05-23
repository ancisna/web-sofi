import { Component, input } from '@angular/core';

@Component({
  selector: 'card-therapy',
  standalone: true,
  imports: [],
  templateUrl: './card-therapy.component.html',
  styleUrl: './card-therapy.component.css',
})
export class CardTherapyComponent {
  therapy = input.required<{
    title: string;
    duration: string;
    price: string;
    description: string;
  }>();
}
