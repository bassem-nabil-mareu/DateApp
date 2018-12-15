import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { log } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login(this.model)
      .subscribe(next => {
        console.log('login done');
      }, er => {
        console.log('login fails');
      });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
      return false;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
