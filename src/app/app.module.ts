import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { LandingComponent } from './components/landing/landing.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { SignUpHospitalComponent } from './components/sign-up-hospital/sign-up-hospital.component';
import { HospitalFormComponent } from './components/admin/hopsital-form/hopsital-form.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';
import { HospitalTableComponent } from './components/admin/hospital-table/hospital-table.component';
import { UsertableComponent } from './components/admin/usertable/usertable.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { ServerService } from './services/server.service';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
@NgModule({
  declarations: [
    MainpageComponent,
    NavbarComponent,
    UsertableComponent,
    HospitalTableComponent,
    UserFormComponent,
    HospitalFormComponent,
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    HomeComponent,
    ProfileComponent,
    SignUpHospitalComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
