import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

// Firebase Modules
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { ProfileComponent } from './users/profile/profile.component';
import { SignInComponent } from './users/sign-in/sign-in.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import {AngularFireDatabaseModule} from 'angularfire2/database'



// angular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import {MatCardModule} from '@angular/material/card';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { GlasswareComponent } from './items/glassware/glassware.component';
import { NewglasswareComponent } from './items/glassware/newglassware/newglassware.component';

import {ItemService} from './services/item.service';
import { GlasswarelistComponent } from './items/glassware/glasswarelist/glasswarelist.component'



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    DashboardMainComponent,
    GlasswareComponent,
    NewglasswareComponent,
    GlasswarelistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [AuthService,{ provide: FirestoreSettingsToken, useValue: {} },ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
