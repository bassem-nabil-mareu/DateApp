import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertfyService } from '../_services/alertfy.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private _userService: UserService, private _router: Router,
        private _authService: AuthService,
        private _alert: AlertfyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._userService.getUser(this._authService.decodedToken.nameid)
            .pipe(
                catchError(er => {
                    this._alert.error(er);
                    this._router.navigate(['/members']);
                    return of(null);
                })
            );
    }
}
