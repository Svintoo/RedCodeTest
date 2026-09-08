import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

type Credentials = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = signal(true);
  client = inject(HttpClient);

  login(credentials: Credentials) {
    console.log(JSON.stringify(credentials));
    this.client.get(environment.apiUrl).subscribe({
      next: (res) => {
        console.log('server response:', res);
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }
}
