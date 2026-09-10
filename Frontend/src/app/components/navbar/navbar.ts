import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DarkMode } from '../../services/dark-mode';
import { LocalStorageService } from '../../services/localstorage';
import { AuthService } from '../../services/auth-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: '../../app.css',
})
export class Navbar {
  theme = inject(DarkMode);
  faSun = faSun;
  faMoon = faMoon;

  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);
  router = inject(Router);

  toggleDarkMode() {
    this.theme.toggle();
    this.localStorageService.setItem('website-theme', this.theme.darkMode() ? 'true' : 'false');
  }
  logOut() {
    this.authService.logout();
    if (this.router.url != '/') {
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }
}
