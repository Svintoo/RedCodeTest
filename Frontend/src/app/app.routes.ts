import { Routes } from '@angular/router';

import { BookPage } from './pages/book-page/book-page';
import { QuotePage } from './pages/quote-page/quote-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
  {
    path: '',
    component: BookPage,
  },
  {
    path: 'citat',
    component: QuotePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
