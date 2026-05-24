import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [Button],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
