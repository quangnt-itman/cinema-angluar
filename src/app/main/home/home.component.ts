import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movies';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  danhSachPhim: Movie[];
  loading: boolean = false;
  error: boolean = false;

  constructor(private moviesService: MoviesService) {}

  // Tương đương componentDidMount bên React
  ngOnInit(): void {
    this.loading = true;

    this.moviesService.layDanhSachPhim().subscribe({
      next: (result) => {
        // this.danhSachPhim = result;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = true;
        this.loading = false;
      },
    });

    this.moviesService.movieList.subscribe({
      next: (result) => {
        this.danhSachPhim = result;
      },
    });
  }
}
