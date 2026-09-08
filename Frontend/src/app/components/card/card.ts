import { Component, inject, input } from '@angular/core';
import { DarkMode } from '../../services/dark-mode';

type BookItem = {
  Id: number;
  Name: string;
  IsComplete: boolean;
};

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: '../../app.css',
})
export class Card {
  theme = inject(DarkMode);
  book = input.required<BookItem>();

  //crud lägger jag här
}
