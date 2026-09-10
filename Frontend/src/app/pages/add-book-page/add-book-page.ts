import { Component, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RequestService, BookData } from '../../services/request-service';

@Component({
  selector: 'app-add-book-page',
  imports: [FormsModule],
  template: ` <h2 class="m-2">Lägg till ny bok</h2>
    <form #bookForm="ngForm" (ngSubmit)="submitBook()">
      <div class="mb-3">
        <label for="title" class="form-label">Titel</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          [(ngModel)]="title"
          maxlength="240"
          required
        />
      </div>
      <div class="mb-3">
        <label for="Author" class="form-label">Författare</label>
        <input
          type="text"
          class="form-control"
          id="Author"
          name="author"
          [(ngModel)]="author"
          maxlength="60"
          required
        />
      </div>
      <div class="mb-3 form">
        <label class="form-check-label" for="date">Datum publicerat</label>
        <input type="date" class="form-control" id="date" name="date" [(ngModel)]="date" required />
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="bookForm.invalid">Spara</button>
    </form>`,
  styleUrl: '../../app.css',
})
export class AddBookPage {
  title = '';
  author = '';
  date = '';

  close = output<void>();

  closeModal() {
    this.close.emit();
  }
  router = inject(Router);

  request = inject(RequestService);

  submitBook() {
    if (!this.title || !this.author || !this.date) {
      return;
    }

    const book: BookData = {
      title: this.title,
      author: this.author,
      date: this.date,
    };

    this.request.addBook(book).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Failed to add book:', err);
      },
    });
  }
}
