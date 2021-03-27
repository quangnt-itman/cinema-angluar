import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class SignupGuard implements CanDeactivate<SignupComponent> {
  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return về true => cho phép rời khỏi page này
    // return về false => không cho phép rời khỏi page này

    // Truy cập đến signupForm và kiểm tra form đã thay đổi
    // hay chưa bằng cách dùng dirty
    const isDirty = component.signupForm.dirty;
    // Nếu isDirty === true => form đã thay đổi
    // show confirm dialog thông báo cho người dùng
    if (isDirty) {
      return confirm('Bạn có chắc muốn rời khỏi trang này');
    }

    // Nếu isDirty === false => form chưa thay đổi => cho phép rời đi
    return true;
  }
}
