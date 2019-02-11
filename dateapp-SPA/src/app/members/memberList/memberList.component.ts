import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { AlertfyService } from '../../_services/alertfy.service';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-memberList',
  templateUrl: './memberList.component.html',
  styleUrls: ['./memberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private _userService: UserService, private route: ActivatedRoute,
    private _alert: AlertfyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    }, er => {
      this._alert.error(er);
    });
    // this.loadUsers();
  }

  // loadUsers() {
  //   this._userService.getUsers()
  //   .subscribe((users: User[]) => {
  //     this.users = users;
  //   }, er => {
  //     this._alert.error(er);
  //   });
  // }
}
