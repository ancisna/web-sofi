import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [RouterLink, ButtonModule],

  templateUrl: './about-page.component.html',

  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {}
