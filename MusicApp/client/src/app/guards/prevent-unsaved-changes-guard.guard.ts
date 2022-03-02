import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuardGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component:MemberEditComponent):  boolean {
      if (component.editForm.dirty) {
        return confirm("Are you sure you want to continue? any uny unsaved changes will will be lost...")
      }
    return true;
  }

}
