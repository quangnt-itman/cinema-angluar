import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewsComponent } from './news/news.component';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Home' } },
      { path: 'news', component: NewsComponent, data: { title: 'News' } },
      {
        path: 'detail/:id',
        component: MovieDetailComponent,
        data: { title: 'Movie-detail' },
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    MovieDetailComponent,
    NewsComponent,
    MainComponent,
  ],
  imports: [
    // Ngoại trừ AppModule, tất cả module khác đều là forChild
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class MainModule {}
