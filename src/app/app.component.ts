import { Component, inject } from '@angular/core';

import { AuthService } from './core/auth/auth.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule]
})
export class AppComponent {

  auth = inject(AuthService);
  email = '';
  password = '';
async login() {

  const { error } = await this.auth.signIn(
    this.email,
    this.password
  );

  console.log(error);

}

}