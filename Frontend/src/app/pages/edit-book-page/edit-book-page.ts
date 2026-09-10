import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService, BookData } from '../../services/request-service';

@Component({
  selector: 'app-add-book-modal',
  imports: [FormsModule],
  template: `<form #bookForm="ngForm" (ngSubmit)="submitBook()">
    <div class="mb-3">
      <label for="bookTitle" class="form-label">Titel</label>
      <input
        type="text"
        class="form-control"
        id="bookTitle"
        name="title"
        [(ngModel)]="title"
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
export class EditBookPage {
  title = signal('');
  author = signal('');
  date = signal('');

  router = inject(Router);
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');

  request = inject(RequestService);

  submitBook() {
    if (!this.title() || !this.author() || !this.date()) {
      return;
    }

    const book: BookData = {
      title: this.title(),
      author: this.author(),
      date: this.date(),
    };

    this.request.updateBook(Number(this.id), book).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('status:', err.status);
        console.error('validation errors:', err.error?.errors);
        console.error('full error:', err);
      },
    });
  }

  ngOnInit() {
    this.request.getBook(Number(this.id)).subscribe({
      next: (res) => {
        this.title.set(res.title);
        this.author.set(res.author);
        this.date.set(res.date);
      },
      error: (err) => {
        console.error('error fetching book: ', err);
      },
    });
  }
}
