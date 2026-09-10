import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './localstorage';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

export type Credentials = {
  email: string;
  password: string;
};

export type AuthToken = {
  token: string;
};

type Jwt = {
  sub: string;
  email: string;
  role: string;
  exp: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private storage = inject(LocalStorageService);

  private readonly apiUrl = environment.apiUrl;

  private readonly tokenKey = 'access_token';
  currentUser = signal<Jwt | null>(this.getUserFromToken());
  loggedIn = signal(this.hasToken());

  login(credentials: Credentials) {
    return this.http.post<AuthToken>(`${this.apiUrl}auth/login`, credentials);
  }

  handleLogin(res: AuthToken) {
    this.storage.setItem(this.tokenKey, res.token);
    this.loggedIn.set(true);
    this.currentUser.set(this.getUserFromToken());
  }

  logout() {
    this.storage.removeItem(this.tokenKey);
    this.loggedIn.set(false);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return this.storage.getItem(this.tokenKey) !== null;
  }

  private getUserFromToken(): Jwt | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      return jwtDecode<Jwt>(token);
    } catch {
      return null;
    }
  }
}
