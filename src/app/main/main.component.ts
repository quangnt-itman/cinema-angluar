import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  curentUser: any = {};
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.initCurrentUser();

    this.auth.currentUser.subscribe({
      next: (result) => {
        console.log(result);
        this.curentUser = result;
      },
    });
  }
}
