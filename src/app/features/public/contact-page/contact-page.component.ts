import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [Button, PageHeroComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {}
