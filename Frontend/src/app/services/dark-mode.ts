import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkMode {
  darkMode = signal(false);

  constructor() {
    const savedTheme = localStorage.getItem('website-theme');

    if (savedTheme === 'true') this.darkMode.set(true);
    this.applyTheme();
  }

  toggle() {
    this.darkMode.update((value) => !value);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-bs-theme', this.darkMode() ? 'dark' : 'light');
  }
}
