import { Component,input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl:'../../app.css'
})
export class Navbar {
    darkMode = input(false);
    darkModeChange = output<boolean>();

      toggleDarkMode() {
    this.darkModeChange.emit(!this.darkMode());
  }
}
