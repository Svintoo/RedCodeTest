import { Routes } from '@angular/router';
import { BookPage } from './pages/book-page/book-page';
import { AddBookPage } from './pages/add-book-page/add-book-page';
import { QuotePage } from './pages/quote-page/quote-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { EditBookPage } from './pages/edit-book-page/edit-book-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: BookPage,
  },
  {
    path: 'ny-bok',
    component: AddBookPage,
    canActivate: [authGuard],
  },
  {
    path: 'redigera-bok/:id',
    component: EditBookPage,
    canActivate: [authGuard],
  },
  {
    path: 'citat',
    component: QuotePage,
    canActivate: [authGuard],
  },
  {
    path: 'logga-in',
    component: LoginPage,
  },
  {
    path: 'registrera',
    component: RegisterPage,
  },
];
