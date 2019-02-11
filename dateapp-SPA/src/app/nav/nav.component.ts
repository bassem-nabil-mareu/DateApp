import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { log } from 'util';
import { AlertfyService } from '../_services/alertfy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private _router: Router, public _authService: AuthService, private alertfy: AlertfyService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login(this.model)
      .subscribe(next => {
      // on success
        this.alertfy.success('login done');
      },
      // on error
      er => {
        this.alertfy.error(er);
      }, () => {
        // on complete
          this._router.navigate(['/member']);
      });
  }

  loggedIn() {
    return this._authService.LoggedIn();
  }

  logout() {
    this._router.navigate(['/home']);
    localStorage.removeItem('token');
    this.alertfy.message('logged out done');
  }
}
