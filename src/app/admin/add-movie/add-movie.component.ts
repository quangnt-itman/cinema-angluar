import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MoviesService } from 'src/app/core/services/movies.service';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  @Output() added = new EventEmitter();
  form: FormGroup;

  constructor(private moviesService: MoviesService) {
    this.form = new FormGroup({
      tenPhim: new FormControl(''),
      biDanh: new FormControl(''),
      trailer: new FormControl(''),
      hinhAnh: new FormControl(''),
      moTa: new FormControl(''),
      ngayKhoiChieu: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  handleUploadFile(evt) {
    console.log(evt.target.files);
    console.log(evt.target.value);
    // setValue là phải set cho toàn bộ các ô input
    // this.form.setValue({ hinhAnh: evt.target.files[0] });

    // pathValue có thể set cho 1 ô input
    this.form.patchValue({ hinhAnh: evt.target.files[0] });

    console.log(this.form.value);
  }

  handleAddMovie() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    // Goi API thêm phim
    this.moviesService.themPhim(this.form.value).subscribe({
      complete: () => {
        // Output ra thằng cha để nó gọi lại API lấy danh sách phim
        this.added.emit();
      },
    });
  }
}
