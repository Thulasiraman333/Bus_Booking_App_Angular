import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusServiceService {

  constructor(private httpClient: HttpClient) { }

  getBusLocations(): Observable<any[]> {
    return this.httpClient.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_BUS_LOCATIONS);
  }

  searchBus(from: string, to: string, date: string): Observable<any[]> {
    return this.httpClient.get<any[]>(Constant.API_END_POINT + Constant.METHODS.SEARCH_BUSES + `?fromLocation=${from}&toLocation=${to}&travelDate=${date}`);
  }

  getBusScheduleById(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_SCHEDULEBY_ID + `?id=${id}`)
  }

  getBookedSeats(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_BOOKED_SEATS + `?shceduleId=${id}`)
  }

  onRegisterBusUser(registerObj: Object): Observable<any[]> {
    return this.httpClient.post<any[]>(Constant.API_END_POINT + Constant.METHODS.ADD_NEW_USER, registerObj);
  }

  onLoginBusUser(registerObj: object): Observable<any> {
    return this.httpClient.post<any>(Constant.API_END_POINT + Constant.METHODS.LOGIN_USER, registerObj);
  }

  onBooking(registerObj: any): Observable<any> {
    return this.httpClient.post<any>(Constant.API_END_POINT + Constant.METHODS.SAVE_BOOKING_DETAILS, registerObj);
  }
}
