import { Component, effect, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request-service';
import { AuthService } from '../../services/auth-service';
import { CreateQuote, QuoteData } from '../../services/request-service';

@Component({
  selector: 'app-edit-quote-modal',
  imports: [FormsModule],
  template: `
    <div
      class="modal fade"
      id="addQuoteModal"
      tabindex="-1"
      aria-labelledby="addQuoteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addQuoteModalLabel">
              {{ quoteToEdit() ? 'Redigera citat' : 'Nytt citat' }}
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Stäng"
            ></button>
          </div>

          <form #quoteForm="ngForm" (ngSubmit)="submitQuote()">
            <div class="modal-body">
              <div class="mb-3">
                <label for="bookTitle" class="form-label"> Bokens Titel </label>

                <input
                  type="text"
                  class="form-control"
                  id="bookTitle"
                  name="bookTitle"
                  [(ngModel)]="bookTitle"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="content" class="form-label"> Text </label>

                <input
                  type="text"
                  class="form-control"
                  id="content"
                  name="content"
                  [(ngModel)]="text"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="pageNumber" class="form-label"> Sida </label>

                <input
                  type="number"
                  class="form-control"
                  id="pageNumber"
                  name="pageNumber"
                  [(ngModel)]="page"
                  required
                  min="1"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>

              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                [disabled]="quoteForm.invalid"
              >
                Spara
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: '../../app.css',
})
export class Modal {
  bookTitle = '';
  text = '';
  page = 0;

  quoteAdded = output<QuoteData>();
  quoteToEdit = input<QuoteData | null>(null);

  http = inject(RequestService);
  auth = inject(AuthService);

  constructor() {
    effect(() => {
      const quote = this.quoteToEdit();

      if (quote) {
        this.bookTitle = quote.bookTitle;
        this.text = quote.text;
        this.page = quote.page;
      } else {
        this.bookTitle = '';
        this.text = '';
        this.page = 0;
      }
    });
  }

  submitQuote() {
    if (!this.bookTitle || !this.text || !this.page) {
      return;
    }

    const user = this.auth.currentUser();

    if (!user) {
      return;
    }

    const userId = Number(user.sub);
    const existingQuote = this.quoteToEdit();

    if (existingQuote) {
      const updatedQuote: QuoteData = {
        id: existingQuote.id,
        bookTitle: this.bookTitle,
        text: this.text,
        page: this.page,
      };

      this.http.updateQuote(userId, updatedQuote).subscribe({
        next: (res) => {
          this.quoteAdded.emit(res);
        },
        error: (err) => {
          console.error('Error updating quote:', err);
        },
      });

      return;
    }

    const newQuote: CreateQuote = {
      bookTitle: this.bookTitle,
      text: this.text,
      page: this.page,
    };

    this.http.addQuote(userId, newQuote).subscribe({
      next: (res) => {
        this.quoteAdded.emit(res);
      },
      error: (err) => {
        console.error('Error adding quote:', err);
      },
    });
  }
}
