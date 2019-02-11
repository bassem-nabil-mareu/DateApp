import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { UserService } from 'src/app/_services/user.service';
import { AlertfyService } from 'src/app/_services/alertfy.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-memberDetail',
  templateUrl: './memberDetail.component.html',
  styleUrls: ['./memberDetail.component.css']
})
export class MemberDetailComponent implements OnInit {
  User: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _userService: UserService, private _alert: AlertfyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.User = data['user']; // from route.ts
    });
    // this.loadUser();
    this.getGalleryOptionsReady();
    this.galleryImages = this.getGalleryImagesReady();
  }

  // loadUser() {
  //   this._userService.getUser(+this.route.snapshot.params['id'])
  //     .subscribe((user: User) => {
  //       this.User = user;
  //     }, er => {
  //       this._alert.error(er);
  //     });
  // }

  getGalleryImagesReady() {
    const imgUrl = [];
    for (let i = 0; i < this.User.photos.length; i++) {
        imgUrl.push({
          small: this.User.photos[i].url,
          medium: this.User.photos[i].url,
          big: this.User.photos[i].url,
        });
    }
    return imgUrl;
  }

  getGalleryOptionsReady() {
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];
  }
}
