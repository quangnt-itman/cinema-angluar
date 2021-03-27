import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return về true thì cho phép truy cập vào page này và ngược lại
    // this.auth.currentUser.subscribe({
    //   next: (result) => {
    //     if (result?.maLoaiNguoiDung === 'QuanTri') {
    //       return true;
    //     }
    //     return false;
    //   },
    // });

    const user = localStorage.getItem('user');

    if (user) {
      const { maLoaiNguoiDung } = JSON.parse(user);
      if (maLoaiNguoiDung === 'QuanTri') {
        // Người dùng là quản trị, return về true cho phép vào
        return true;
      }
      // Đã đăng nhập, nhưng maLoaiNguoiDung là KhachHang
      // Cho redirect về trang Home
      this.router.navigate(['/']);
      return false;
    }

    // Chưa đăng nhập
    // Cho redirect về trang Signin
    this.router.navigate(['/signin']);
    return false;
  }
}
