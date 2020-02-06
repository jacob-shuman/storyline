import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: ResetPasswordComponent,
    path: 'reset'
  },
  {
    component: LandingComponent,
    path: 'landing'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: RegistrationComponent,
    path: 'registration'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
