import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { RequestService, Book } from '../../services/request-service';
import { AuthService } from '../../services/auth-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faBook, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-page',
  imports: [RouterLink, FontAwesomeModule],
  styleUrl: '../../app.css',
  template: `
    @if (auth.currentUser(); as user) {
      <button class="btn btn-primary btn-sm m-2" routerLink="/ny-bok" title="Lägg till ny bok">
        <fa-icon [icon]="faPlus"></fa-icon>
        <fa-icon [icon]="faBook"></fa-icon>
      </button>
      <small>- Lägg till ny bok</small>
    }
    <ul class="list-group list-group-flush">
      @for (book of books(); track book.id) {
        <li class="list-group-item d-flex justify-content-between">
          <span class="flex-grow-1 min-width-0 text-wrap text-break"
            >{{ book.title }} - {{ book.author }} - {{ book.date.split('T')[0] }}</span
          >
          @if (auth.currentUser(); as user) {
            <span class="d-inline-flex flex-shrink-0 ms-2">
              <button
                class="btn btn-secondary btn-sm me-1 ms-1"
                [routerLink]="['/redigera-bok', book.id]"
                title="Redigera bok"
              >
                <fa-icon [icon]="faEdit"></fa-icon>
              </button>
              <button
                class="btn btn-danger btn-sm"
                (click)="deleteBook(book.id)"
                title="Ta bort bok"
              >
                <fa-icon [icon]="faTrash"></fa-icon>
              </button>
            </span>
          }
        </li>
      }
    </ul>
  `,
})
export class BookPage {
  request = inject(RequestService);
  router = inject(Router);
  auth = inject(AuthService);

  books = signal<Book[]>([]);

  faPlus = faPlus;
  faBook = faBook;
  faEdit = faEdit;
  faTrash = faTrash;

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.books.set([]);
    this.request.getBooks().subscribe({
      next: (res) => {
        this.books.set(res);
      },
      error: (err) => {
        console.error('error fetching books: ', err);
      },
    });
  }

  deleteBook(id: number) {
    this.request.deleteBook(id).subscribe({
      next: () => {
        this.fetchBooks();
      },
      error: (err) => {
        console.error('error deleting book: ', err);
      },
    });
  }
}
