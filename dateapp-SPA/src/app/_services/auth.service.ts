import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhoto = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  LoggedIn() {
    const token = localStorage.getItem('token');
    // return true if token not expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  changePhotoUrl(photoUrl) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // setItem take string but we have object so we use json.stringify
          // to convert string to object use json.parse
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changePhotoUrl(this.currentUser.photoURL);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'registerme', model);
  }
}
