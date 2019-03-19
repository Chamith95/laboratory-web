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
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import {ItemService} from './services/item.service';
import { GlasswarelistComponent } from './items/glassware/glasswarelist/glasswarelist.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { ItemAdditionService } from './services/item-addition.service';






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
    AdminNavComponent,

   

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
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [AuthService,{ provide: FirestoreSettingsToken, useValue: {} },ItemService,ItemAdditionService],
  bootstrap: [AppComponent],
  entryComponents:[NewglasswareComponent]
})
export class AppModule { }
