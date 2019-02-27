import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertfyService } from 'src/app/_services/alertfy.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-memberEdit',
  templateUrl: './memberEdit.component.html',
  styleUrls: ['./memberEdit.component.css']
})
export class MemberEditComponent implements OnInit {
  User: User;
  @ViewChild('EditForm') EditForm: NgForm;
  constructor(private route: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService,
    private _alertify: AlertfyService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.User = data['user'];
    });
  }

  EditUser() {
    this._userService.updateUser(this._authService.decodedToken.nameid, this.User)
        .subscribe(next => {
          this.EditForm.reset(this.User);
          this._alertify.success('updated Done');
        }, er => {
          this._alertify.error(er);
        });
  }
}
