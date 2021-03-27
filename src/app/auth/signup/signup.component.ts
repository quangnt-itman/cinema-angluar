import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') signupForm: NgForm;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  dangKy(values: any) {
    console.log(values);
    console.log(this.signupForm);
    this.auth.dangKy(values).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log('Đăng ký thành công'),
    });
  }
}
