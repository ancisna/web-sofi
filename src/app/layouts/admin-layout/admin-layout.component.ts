import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-layout',

  standalone: true,

  imports: [RouterLink, RouterOutlet],

  templateUrl: './admin-layout.component.html',

  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
