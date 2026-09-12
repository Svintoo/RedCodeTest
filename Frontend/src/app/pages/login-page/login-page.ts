import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credentials } from '../../services/auth-service';
import { RequestService } from '../../services/request-service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  template: `
    <h2 class="m-2">Logga in</h2>
    <form class="m-2" #loginForm="ngForm" (ngSubmit)="submitLogin()">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailInput"
          aria-describedby="emailHelp"
          name="email"
          [(ngModel)]="email"
          required
          [class.border-danger]="loginError()"
        />
        @if (missingAt() == true) {
          <p class=" ms-2 small text-danger">adressen saknar @</p>
        }
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Lösenord</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          name="password"
          [(ngModel)]="password"
          required
          [class.border-danger]="loginError()"
        />
        <small class="small m-2 text-muted">Minst 8 tecken långt</small>
      </div>
      @if (loginError() == true) {
        <p class=" ms-2 small text-danger">Något gick fel med att logga in</p>
      }

      <button
        type="submit"
        class="btn btn-primary"
        [disabled]="loginForm.invalid"
        [class.btn-outline-secondary]="loginForm.invalid"
      >
        Logga in
      </button>
    </form>
  `,
})
export class LoginPage {
  email = '';
  password = '';

  loginError = signal(false);
  missingAt = signal(false);

  auth = inject(AuthService);
  request = inject(RequestService);
  router = inject(Router);
  storage = inject(LocalStorageService);

  submitLogin() {
    if (!this.email || !this.password) {
      this.loginError.set(true);
      return;
    }

    if (!this.email.includes('@')) {
      this.loginError.set(true);
      this.missingAt.set(true);
    }

    this.loginError.set(false);

    const credentials: Credentials = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(credentials).subscribe({
      next: (res) => {
        this.auth.handleLogin(res);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
        this.loginError.set(true);
      },
    });
  }
}
