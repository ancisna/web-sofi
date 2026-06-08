import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';

@Component({
  selector: 'not-found-page',

  standalone: true,

  imports: [RouterLink, Button],

  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
