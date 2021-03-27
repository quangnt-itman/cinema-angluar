import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      taiKhoan: new FormControl('', [Validators.required]),
      matKhau: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // Validators.email
      ]),
    });
  }

  ngOnInit(): void {}

  dangNhap() {
    this.signinForm.markAllAsTouched();
    if (this.signinForm.invalid) return;

    console.log(this.signinForm.value);
    this.auth.dangNhap(this.signinForm.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.error),
      complete: () => {
        console.log('Dang nhập thành công');
        // router.navigate dùng để chuyển trang
        // tương tự history.push bên react
        this.router.navigate(['/']);
      },
    });
  }
}
