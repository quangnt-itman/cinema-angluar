import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
// tap để lấy kết quả trả về của Observable trong hàm pipe
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  curentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser = this.curentUserSubject.asObservable();

  constructor(private api: ApiService) {}

  initCurrentUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.curentUserSubject.next(JSON.parse(user));
    }
  }

  dangKy(values: any): Observable<any> {
    const url = 'QuanLyNguoiDung/DangKy';
    return this.api.post(url, { ...values, maNhom: 'GP01' });
  }

  dangNhap(values: any): Observable<any> {
    const url = 'QuanLyNguoiDung/DangNhap';
    return this.api.post(url, values).pipe(
      tap((result) => {
        localStorage.setItem('user', JSON.stringify(result));
        // this.curentUserSubject = result
        this.curentUserSubject.next(result);
      })
    );
  }
}
