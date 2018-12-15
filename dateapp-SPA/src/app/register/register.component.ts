import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  register () {
    this._authService.register(this.model)
    .subscribe(() => {
      console.log('register done');
    }, err => {
      console.log(err.error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
