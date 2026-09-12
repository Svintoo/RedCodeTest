import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService, Roles, RegisterCredentials } from '../../services/request-service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  template: `
    <h2 class="m-2">Registrering</h2>
    <form class="m-2" #loginForm="ngForm" (ngSubmit)="submitRegistration()">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailInput"
          aria-describedby="emailHelp"
          name="email"
          [(ngModel)]="email"
          maxlength="254"
          minlength="6"
          required
          [class.border-danger]="registerError()"
        />
        @if (missingAt() == true) {
          <p class=" ms-2 small text-danger">adressen saknar @</p>
        }
      </div>
      <div class="mb-3">
        <label for="passwordInput" class="form-label">Lösenord</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          name="password"
          [(ngModel)]="password"
          maxlength="128"
          minlength="8"
          required
          [class.border-danger]="registerError()"
        />
        <small class="small m-2 text-muted">Minst 8 tecken långt</small>
      </div>
      <div class="mb-3">
        <div class="input-group mb-3">
          <label class="input-group-text" for="role">Roll</label>
          <select class="form-select" id="role" name="role" [(ngModel)]="role" required>
            <option [ngValue]="Roles.User">Användare</option>
            <option [ngValue]="Roles.Admin">Administratör</option>
          </select>
        </div>
      </div>
      @if (registerError() == true) {
        <p class=" ms-2 small text-danger">Något gick fel med registreringen</p>
      }
      <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
        Registrera användare
      </button>
    </form>
  `,
})
export class RegisterPage {
  Roles = Roles;
  email = '';
  password = '';
  role = Roles.User;

  registerError = signal(false);
  missingAt = signal(false);

  request = inject(RequestService);
  router = inject(Router);

  submitRegistration() {
    if (!this.email || !this.password) {
      this.registerError.set(false);
      return;
    }

    if (!this.email.includes('@')) {
      this.registerError.set(true);
      this.missingAt.set(true);
    }

    this.registerError.set(false);

    const credentials: RegisterCredentials = {
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.request.register(credentials).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
        this.registerError.set(true);
      },
    });
  }
}
