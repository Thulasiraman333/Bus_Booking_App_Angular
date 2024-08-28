import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BusServiceService } from './pages/services/bus-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bus_booking';
  isLoginForm: boolean = true;

  masterSrv = inject(BusServiceService);
  registerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }
  loggedUserData: any;

  constructor() {

    const localUser = localStorage.getItem('redBusUser');
    if (localUser != null) {
      this.loggedUserData = JSON.parse(localUser);
    } else {
      this.loggedUserData = undefined;
    }
  }
  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    this.masterSrv.onRegisterBusUser(this.registerObj).subscribe((res: any) => {
      alert('User Registered Successfully');
      this.loggedUserData = res.data;
      this.closeModel()
      localStorage.setItem('redBusUser', JSON.stringify(this.loggedUserData));
    }, (error) => {
      alert(JSON.stringify(error));
    })
  }

  onLogin() {
    this.masterSrv.onLoginBusUser(this.registerObj).subscribe((res: any) => {
      alert('Logged-In Successfully');
      this.closeModel();
      this.loggedUserData = res.data;
      localStorage.setItem('redBusUser', JSON.stringify(this.loggedUserData));
    }, (error) => {
      alert(JSON.stringify(error));
    })
  }

  logOff() {
    this.loggedUserData = undefined;
    localStorage.removeItem('redBusUser');
  }
}
