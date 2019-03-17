import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertfyService } from 'src/app/_services/alertfy.service';

@Component({
  selector: 'app-photoEditor',
  templateUrl: './photoEditor.component.html',
  styleUrls: ['./photoEditor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() changeMianPhoto = new EventEmitter<string>();
  uploader: FileUploader;
  currentPhoto: Photo;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(private _authService: AuthService,
    private _userService: UserService,
    private _alertify: AlertfyService
    ) { }

  ngOnInit() {
    this.initializeUploader();
  }

   fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this._authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10 mega
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          createdOn: res.createdOn,
          desc: res.desc,
          isMain: res.isMain,
        };
        this.photos.push(photo);

        if (photo.isMain) {
          this._authService.changePhotoUrl(photo.url);
          this._authService.currentUser.photoURL = photo.url;
          // override the current user in storage
          localStorage.setItem('user', JSON.stringify(this._authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this._userService.setMainPhoto(photo.id, this._authService.decodedToken.nameid)
    .subscribe(() => {
        this.currentPhoto = this.photos.filter(j => j.isMain === true)[0];
        this.currentPhoto.isMain = false;
        photo.isMain = true;
        this.changeMianPhoto.emit(photo.url);

        this._authService.changePhotoUrl(photo.url);
        this._authService.currentUser.photoURL = photo.url;
        // override the current user in storage
        localStorage.setItem('user', JSON.stringify(this._authService.currentUser));

        this._alertify.success('this photo is main now');
    }, er => {
      this._alertify.error(er);
    });
  }

  deletePhoto(photoId: number) {
    this._alertify.confirm('Are u sure?', () => {
        this._userService.deletePhoto(photoId, this._authService.decodedToken.nameid)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(w => w.id === photoId), 1);
          this._alertify.success('photo deleted');
        }, er => {
          this._alertify.error(er);
        });
    });
  }
}
