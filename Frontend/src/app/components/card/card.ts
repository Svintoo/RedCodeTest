import { Component, output, input } from '@angular/core';
import { QuoteData } from '../../services/request-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quote-card',
  imports: [FontAwesomeModule],
  templateUrl: './card.html',
  styleUrl: '../../app.css',
})
export class Card {
  quote = input.required<QuoteData>();
  editMode = input(false);

  edit = output<number>();
  remove = output<number>();

  faEdit = faEdit;
  faTrash = faTrash;

  editQuote(id: number) {
    this.edit.emit(id);
  }
  removeQuote(id: number) {
    this.remove.emit(id);
  }
}
