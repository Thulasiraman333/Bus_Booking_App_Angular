import { Component, inject } from '@angular/core';
import { BusServiceService } from '../services/bus-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  SeatDetails: any = [];
  masterSrv = inject(BusServiceService);
  scheduleId: string = '';
  scheduleData: any = [];
  seatArray: any = [];
  bookedSeatArray: any = [];
  userSelectedSeatArray: any = [];
  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
      this.getScheduleDetailsById();
      this.getBookedSeats();
    })
  }
  ngOnInit() {

  }

  getScheduleDetailsById() {
    this.masterSrv.getBusScheduleById(this.scheduleId).subscribe((res) => {
      this.scheduleData = res;
      for (let i = 1; i < this.scheduleData.totalSeats; i++) {
        this.seatArray.push(i);
      }
    })
  }

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe((res) => {
      this.bookedSeatArray = res;
    })
  }

  checkIfSeatBooked(seatNo: number) {
    return this.bookedSeatArray.indexOf(seatNo);
  }

  selectSeat(seatNo: number) {
    const obj = {
      "passengerId": 0,
      "bookingId": 0,
      "passengerName": "",
      "age": 0,
      "gender": "",
      "seatNo": 0
    }
    obj.seatNo = seatNo
    this.userSelectedSeatArray.push(obj);
  }

  checkIfSeatSelected(seatNo: number) {
    return this.userSelectedSeatArray.findIndex((m: any) => m.seatNo == seatNo);
  }

  bookNow() {
    const loggedData = localStorage.getItem('redBusUser');
    if (loggedData) {
      let user = JSON.parse(loggedData);
      let model = {
        "bookingId": 0,
        "custId": user.userId,
        "bookingDate": new Date(),
        "scheduleId": this.scheduleId,
        "BusBookingPassengers": this.userSelectedSeatArray
      }
      this.masterSrv.onBooking(model).subscribe((res: any) => {
        alert('Booking Success');
      })
    } else {
      alert('Please Login');
    }
  }
}
