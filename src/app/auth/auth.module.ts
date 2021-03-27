import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
// Import FormsModule để sử dụng template-driven form
// Import ReactiveFormsModule để sử dụng ReactiveForms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupGuard } from 'src/app/core/guards/signup.guard';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      {
        path: 'signup',
        component: SignupComponent,
        canDeactivate: [SignupGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
