import { Component, input } from '@angular/core';
import { Workshop } from '@core/models/workshop.model';

@Component({
  selector: 'card-workshop',
  standalone: true,
  imports: [],
  templateUrl: './card-workshop.component.html',
  styleUrl: './card-workshop.component.css',
})
export class CardWorkshopComponent {
  workshop = input.required<Workshop>();
}
