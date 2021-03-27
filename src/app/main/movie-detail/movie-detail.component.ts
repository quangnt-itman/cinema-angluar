import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  chiTietPhim: any;
  loading: boolean = false;
  error: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    // activatedRoute dùng để lấy params từ trên url
    this.activatedRoute.params.subscribe({
      next: (params) => {
        console.log(params);
        this.loading = true;
        this.moviesService.layChiTietPhim(params.id).subscribe({
          next: (result) => {
            this.chiTietPhim = result;
            this.loading = false;
          },
          error: (err) => {
            this.error = true;
            this.loading = false;
          },
        });
      },
    });
  }
}
