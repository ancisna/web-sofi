import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'therapy-form-page',

  standalone: true,

  imports: [],

  templateUrl: './therapy-form-page.component.html',

  styleUrl: './therapy-form-page.component.css',
})
export class TherapyFormPageComponent {
  private route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id');

  isEditMode = !!this.id;
}
