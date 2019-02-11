import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertfyService } from '../_services/alertfy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _authService: AuthService, private alertfy: AlertfyService) { }

  ngOnInit() {
  }

  register () {
    this._authService.register(this.model)
    .subscribe(() => {
      this.alertfy.success('login done');
    }, er => {
      this.alertfy.error(er);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
