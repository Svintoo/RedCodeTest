import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkMode {
  darkMode = signal(false);

  toggle() {
    this.darkMode.update((value) => !value);
  }
}
