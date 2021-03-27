import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // link tới file html, code UI
  styleUrls: ['./app.component.scss'], // link tới files css/scss, code style
})
// Nơi code logic
export class AppComponent implements OnInit {
  constructor(private title: Title, private router: Router) {
    // Theo dõi sự thay đôi của url
    this.router.events.subscribe({
      next: (event) => {
        // Kiếm tra xem hiện tại đã chuyển trang thành công chưa
        if (event instanceof NavigationEnd) {
          console.log(router.routerState, router.routerState.root);
          const title = this.getTitle(
            router.routerState,
            router.routerState.root
          ).join('-');
          console.log('title', title);
          this.title.setTitle(title);
        }
      },
    });
  }

  // Duyệt qua cây router từ gốc
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  ngOnInit(): void {}
}
