import { Component } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';

type UserCredentials = {
  Email: string;
  Password: string;
};

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  template: `
    <h2 class="m-2">Registrering</h2>
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
        />
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
        />
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Logga in</button>
    </form>
  `,
})
export class RegisterPage {
  email = '';
  password = '';

  submitLogin() {
    if (!this.email || !this.password) {
      //toast?
      return;
    }
    //await LoginService.signUp(credentials) ok save token
    console.log('signing up');
  }
}
