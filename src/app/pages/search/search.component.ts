import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BusServiceService } from '../services/bus-service.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private router: Router) {

  }
  location$: Observable<any[]> = new Observable<any[]>;
  masterSrv = inject(BusServiceService);
  searchObj = {
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  }
  busList: any = [];
  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.location$ = this.masterSrv.getBusLocations();
  }

  onSearch() {
    const { fromLocation, toLocation, travelDate } = this.searchObj;
    this.masterSrv.searchBus(fromLocation, toLocation, travelDate).subscribe((res: any[]) => {
      this.busList = res;
      console.log(this.busList);
    })
  }

  viewSeat(id: string) {
    this.router.navigate(['/booking', id]);
  }
}
