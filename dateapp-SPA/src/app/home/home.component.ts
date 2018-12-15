import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  values: any;
  regiserMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerSwitch() {
    this.regiserMode = true;
  }

  cancelRegisterMode(cancelreg: boolean) {
    this.regiserMode = cancelreg;
  }
  getValues() {
    this.http.get('http://localhost:5000/api/values')
    .subscribe(response => {
      this.values = response;
    }, err => {
      console.log(err);
    });
  }
}
