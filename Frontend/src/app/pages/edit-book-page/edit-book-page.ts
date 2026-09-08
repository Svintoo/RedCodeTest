import { Component, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//validationservice?

type BookItem = {
  Title: string;
  Author: string;
  Date: Date;
};

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
  title = '';
  author = '';
  date = '';

  close = output<void>();

  closeModal() {
    this.close.emit();
  }
  router = inject(Router);

  submitBook() {
    if (!this.title || !this.author || !this.date) {
      //toast?
      return;
    }
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      return;
    }

    const book: BookItem = {
      Title: this.title,
      Author: this.author,
      Date: parsedDate,
    };
    console.log(book);
    //RequestService.call()

    //if ok
    this.router.navigateByUrl('/');
  }

  route = inject(ActivatedRoute);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
}
