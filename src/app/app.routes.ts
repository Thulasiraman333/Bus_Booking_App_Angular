import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [

  { path: '', redirectTo: 'searchPage', pathMatch: 'full' },
  {
    path: 'searchPage',
    component: SearchComponent
  },
  {
    path: 'booking/:id',
    component: BookingComponent
  }
];
