import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertfyService } from '../_services/alertfy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _alertfiy: AlertfyService,
    private _router: Router) {}

  canActivate(): boolean {
    if (this._authService.LoggedIn()) {
      return true;
    }

    this._alertfiy.error('login to go here...');
    this._router.navigate(['/home']);
    return false;
  }
}
