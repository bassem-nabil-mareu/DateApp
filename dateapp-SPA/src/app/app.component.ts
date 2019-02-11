import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bassem angular app';
  jwtHelper = new JwtHelperService();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
    this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
