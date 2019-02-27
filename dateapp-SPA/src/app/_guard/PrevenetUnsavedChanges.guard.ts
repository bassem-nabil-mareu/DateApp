import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertfyService } from '../_services/alertfy.service';
import { MemberEditComponent } from '../members/memberEdit/memberEdit.component';

@Injectable({
  providedIn: 'root'
})
export class PrevenetUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  constructor() {}

  canDeactivate(component: MemberEditComponent): boolean {
    if (component.EditForm.dirty) {
      return confirm('unsaved changes !!!!');
    }
    return true;
  }
}
