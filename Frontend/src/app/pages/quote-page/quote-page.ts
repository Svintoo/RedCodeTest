import { Component, inject, signal, input } from '@angular/core';
import { RequestService, QuoteData } from '../../services/request-service';
import { Modal } from '../../components/modal/modal';
import { Card } from '../../components/card/card';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-quote-page',
  imports: [Card, Modal],
  styleUrl: '../../app.css',
  template: `
    <h3 class="m-2">Mina citat</h3>
    <span class="d-flex flex-row align-items-center">
      <button
        type="button"
        class="btn btn-primary btn-sm m-2"
        data-bs-toggle="modal"
        data-bs-target="#addQuoteModal"
        (click)="quoteToEdit.set(null)"
      >
        Lägg till nytt citat
      </button>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="editModeSwitch"
          [checked]="editMode()"
          (change)="toggleEditMode($event)"
        />
        <label class="form-check-label" for="editModeSwitch"> Redigera </label>
      </div></span
    >

    <app-edit-quote-modal
      [quoteToEdit]="quoteToEdit()"
      (quoteAdded)="onQuoteAdded($event)"
    ></app-edit-quote-modal>

    <section class="quote-grid m-2">
      @for (quote of quotes(); track quote.id) {
        <app-quote-card
          class="list-group-item d-flex justify-content-between m-1"
          [quote]="quote"
          [editMode]="editMode()"
          (edit)="editQuote($event)"
          (remove)="removeQuote($event)"
        >
        </app-quote-card>
      }
    </section>
  `,
})
export class QuotePage {
  request = inject(RequestService);
  auth = inject(AuthService);

  quotes = signal<QuoteData[]>([]);
  editMode = signal(true);

  quoteToEdit = signal<QuoteData | null>(null);

  toggleEditMode(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.editMode.set(checked);
  }

  onQuoteAdded(quote: QuoteData) {
    this.quotes.update((quotes) => {
      const exists = quotes.some((q) => q.id === quote.id);
      if (exists) {
        return quotes.map((q) => (q.id === quote.id ? quote : q));
      }
      return [...quotes, quote];
    });
    this.quoteToEdit.set(null);
  }

  ngOnInit() {
    const user = this.auth.currentUser();

    if (!user) {
      return;
    }

    const userId = Number(user.sub);

    this.request.getQuotes(userId).subscribe({
      next: (res) => {
        this.quotes.set(res);
      },
      error: (err) => {
        console.error('error fetching quotes: ', err);
      },
    });
  }

  editQuote(id: number) {
    const quote = this.quotes().find((quote) => quote.id === id);
    if (!quote) {
      return;
    }

    this.quoteToEdit.set(quote);
  }

  removeQuote(id: number) {
    this.request.deleteQuote(id).subscribe({
      next: () => {
        this.quotes.update((quotes) => quotes.filter((quote) => quote.id !== id));
      },
      error: (err) => {
        console.error('Failed to delete quote:', err);
      },
    });
  }
}
