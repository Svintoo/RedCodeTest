import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { DarkMode } from './services/dark-mode';
import { LocalStorageService } from './services/localstorage';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  theme = inject(DarkMode);
  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);

  constructor() {
    const themeCookie = this.localStorageService.getItem('website-theme');

    if (themeCookie) {
      this.theme.darkMode.set(themeCookie === 'true');
    }
  }
}
