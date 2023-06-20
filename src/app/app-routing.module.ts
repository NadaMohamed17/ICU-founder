import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpHospitalComponent } from './components/sign-up-hospital/sign-up-hospital.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AdminComponent } from './components/admin/admin.component';
import { HospitalTableComponent } from './components/admin/hospital-table/hospital-table.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { HospitalFormComponent } from './components/admin/hopsital-form/hopsital-form.component';
import { UsertableComponent } from './components/admin/usertable/usertable.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes = [
  { path: 'home/:id', component: MainpageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/usertable', component: UsertableComponent },
  { path: 'admin/hospital-table', component: HospitalTableComponent },
  { path: 'admin/usertable/:id', component: UserFormComponent },
  { path: 'admin/hospital-table/:id', component: HospitalFormComponent },
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'sign-up-hospital',
    component: SignUpHospitalComponent
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
