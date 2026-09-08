import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../components/card/card';
import { AddBookPage } from '../add-book-page/add-book-page';

type BookItem = {
  Id: number;
  Title: string;
  Author: string;
  Date: string;
};

@Component({
  selector: 'app-book-page',
  imports: [RouterLink],
  styleUrl: '../../app.css',
  template: `
    <button
      class="btn btn-primary btn-sm m-2"
      (click)="showAddBookModal(true)"
      routerLink="/ny-bok"
    >
      Lägg till ny bok
    </button>
    <ul class="list-group list-group-flush">
      @for (book of placeholderBooks; track book.Id) {
        <li class="list-group-item d-flex justify-content-between">
          <span class="text-wrap text-break"
            >{{ book.Title }} - {{ book.Author }} - {{ book.Date }}</span
          >
          <span class="d-flex flex-row">
            <button
              class="btn btn-secondary btn-sm me-1 ms-1"
              [routerLink]="['/redigera-bok', book.Id]"
            >
              redigera
            </button>
            <button class="btn btn-danger btn-sm">ta bort</button>
          </span>
        </li>
      }
    </ul>
  `,
})
export class BookPage {
  showAddBook = false;

  placeholderBooks: BookItem[] = [
    {
      Id: 0,
      Title: 'The Hobbit',
      Author: 'J.R.R. Tolkien',
      Date: '2026-08-30',
    },
    {
      Id: 1,
      Title: '1984',
      Author: 'George Orwell',
      Date: '2026-08-28',
    },
    {
      Id: 2,
      Title: 'To Kill a Mockingbird',
      Author: 'Harper Lee',
      Date: '2026-08-20',
    },
    {
      Id: 3,
      Title: 'The Great Gatsby',
      Author: 'F. Scott Fitzgerald',
      Date: '2026-08-15',
    },
    {
      Id: 4,
      Title: 'Pride and Prejudice',
      Author: 'Jane Austen',
      Date: '2026-08-10',
    },
  ];

  showAddBookModal(val: boolean) {
    this.showAddBook = val;
  }
}
