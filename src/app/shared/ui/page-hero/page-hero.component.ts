import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'page-hero',
  standalone: true,
  imports: [],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeroComponent {
  title = input.required<string>();
  description = input<string>();
  compact = input(false);
}
