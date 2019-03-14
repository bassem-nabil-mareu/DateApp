import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { tokenName } from '@angular/compiler';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bassem angular app';
  jwtHelper = new JwtHelperService();
  photoUrl: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    // setItem take string but we have object so we use json.stringify
    // to convert string to object use json.parse
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this._authService.currentUser = user;
      this._authService.changePhotoUrl(user.photoURL);
    }
  }
}
