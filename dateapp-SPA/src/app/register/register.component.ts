import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertfyService } from '../_services/alertfy.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  user: User;
  registerForm: FormGroup;

  constructor(private _authService: AuthService, private alertfy: AlertfyService,
    private Fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    // add ReactiveFormsModule in app module
    this.createRegisterForm();

    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    //   confirmPassword: new FormControl('', [Validators.required]),
    // }, this.customPasswordMatch);
  }

  createRegisterForm() {
    this.registerForm = this.Fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.customPasswordMatch});
  }

  customPasswordMatch(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value ? null : {'notmatch': true};
  }

  register () {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log('-----',this.user);
      this._authService.register(this.user)
        .subscribe(() => {
          this.alertfy.success('registration done');
        }, er => {
          this.alertfy.error(er);
        }, () => {
          this._authService.login(this.user)
            .subscribe(() => {
              this._router.navigate(['/member']);
            });
        });
    }
    // this._authService.register(this.model)
    // .subscribe(() => {
    //   this.alertfy.success('login done');
    // }, er => {
    //   this.alertfy.error(er);
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
