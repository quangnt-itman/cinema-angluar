import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movies';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieListSubject = new BehaviorSubject([]);
  movieList = this.movieListSubject.asObservable();

  constructor(private api: ApiService) {}

  layDanhSachPhim(): Observable<Movie[]> {
    const url = 'QuanLyPhim/LayDanhSachPhim';

    // const options = {
    //   headers: {
    //     Authorization: '123',
    //   },
    // };

    return this.api.get<Movie[]>(url).pipe(
      tap((result) => {
        this.movieListSubject.next(result);
      })
    );
  }

  layDanhSachPhimPhanTrang(
    soTrang = 1,
    soPhanTuTrenTrang = 5
  ): Observable<any> {
    return this.api.get(
      `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
  }

  layChiTietPhim(maPhim: string): Observable<any> {
    const url = `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;

    return this.api.get(url);
  }

  themPhim(values: any): Observable<any> {
    const url = 'QuanLyPhim/ThemPhimUploadHinh';
    const obj = {
      ...values,
      maNhom: 'GP01',
    };
    // Bởi vì obj có 1 key là File nên phải sử dụng đối tượng FormData
    const formData = new FormData();

    for (let key in obj) {
      formData.append(key, obj[key]);
    }

    // return this.api.post(url, { ...values, maNhom: 'GP01' });
    return this.api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
