import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type Book = {
  id: number;
  title: string;
  author: string;
  date: string;
};

export type BookData = {
  title: string;
  author: string;
  date: string;
};

export type QuoteData = {
  id: number;
  bookTitle: string;
  text: string;
  page: number;
};

export type CreateQuote = {
  bookTitle: string;
  text: string;
  page: number;
};

export enum Roles {
  User,
  Admin,
}

export type RegisterCredentials = {
  email: string;
  password: string;
  role: Roles;
};

export type UserCredentials = {
  email: string;
  password: string;
};

type AuthToken = {
  Authorization: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  logout(credentials: UserCredentials) {
    return this.http.post<AuthToken>(`${this.apiUrl}auth/logout`, credentials);
  }

  register(credentials: RegisterCredentials) {
    return this.http.post<any>(`${this.apiUrl}auth/register`, credentials);
  }

  addBook(book: BookData) {
    return this.http.post<Book>(`${this.apiUrl}Book/`, book);
  }

  getBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}Book/`);
  }

  getBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}Book/${id}`);
  }

  updateBook(id: number, book: BookData) {
    return this.http.patch<Book>(`${this.apiUrl}Book/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete<Book[]>(`${this.apiUrl}Book/${id}`);
  }

  getQuotes(userId: number) {
    return this.http.get<QuoteData[]>(`${this.apiUrl}Quote/${userId}`);
  }

  getQuote(id: number) {
    return this.http.get<QuoteData>(`${this.apiUrl}Quote/${id}`);
  }

  addQuote(userId: number, quote: CreateQuote) {
    return this.http.post<QuoteData>(`${this.apiUrl}Quote/${userId}`, quote);
  }

  updateQuote(userId: number, quote: QuoteData) {
    return this.http.patch<QuoteData>(`${this.apiUrl}Quote/${userId}`, quote);
  }

  deleteQuote(id: number) {
    return this.http.delete<void>(`${this.apiUrl}Quote/${id}`);
  }
}
