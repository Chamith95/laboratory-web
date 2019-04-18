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
import {AngularFireDatabaseModule} from 'angularfire2/database';

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
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ChartsModule as Ng2Charts } from 'ng2-charts';


import {ItemService} from './services/glassware.service';

import { GlasswarelistComponent } from './items/glassware/glasswarelist/glasswarelist.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule, MatNativeDateModule } from '@angular/material';
import { ItemAdditionService } from './services/item-addition.service';
import { AddnewcartComponent } from './items/addnewcart/addnewcart.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddhistoryComponent } from './items/addhistory/addhistory.component';
import { QuantitydialogComponent } from './items/glassware/quantitydialog/quantitydialog.component';
import { RemovalcartComponent } from './items/removalcart/removalcart.component';
import { RemhistoryComponent } from './items/remhistory/remhistory.component';
import { ChemicallistComponent } from './items/chemicals/chemicallist/chemicallist.component';
import { NewchemicalsdialogComponent } from './items/chemicals/newchemicalsdialog/newchemicalsdialog.component';
import { ChemicalquantitydialogComponent } from './items/chemicals/chemicalquantitydialog/chemicalquantitydialog.component';
import { UiService } from './services/ui.service';
import { LendingMainFormComponent } from './lending_items/lending-main-form/lending-main-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { LendingFormStep1Component } from './lending_items/lending-form-step2/lending-form-step2.component';
import { LendingquantitydialogComponent } from './lending_items/lendingquantitydialog/lendingquantitydialog.component';
import { PerishablelistComponent } from './items/perishables/perishablelist/perishablelist.component';
import { NewperishablesComponent } from './items/perishables/newperishables/newperishables.component';
import { PeriqunatitydialogComponent } from './items/perishables/periqunatitydialog/periqunatitydialog.component';
import { PermEquiplistComponent } from './items/permEquipment/perm-equiplist/perm-equiplist.component';
import { NewpermEquipmentComponent } from './items/permEquipment/newperm-equipment/newperm-equipment.component';
import { PermQuantitydialogComponent } from './items/permEquipment/perm-quantitydialog/perm-quantitydialog.component';
import { CategoryCardComponent } from './dashboard/category-card/category-card.component';



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
    AddnewcartComponent,
    AddhistoryComponent,
    QuantitydialogComponent,
    RemovalcartComponent,
    RemhistoryComponent,
    ChemicallistComponent,
    NewchemicalsdialogComponent,
    ChemicalquantitydialogComponent,
    LendingMainFormComponent,
    LendingFormStep1Component,
    LendingquantitydialogComponent,
    PerishablelistComponent,
    NewperishablesComponent,
    PeriqunatitydialogComponent,
    PermEquiplistComponent,
    NewpermEquipmentComponent,
    PermQuantitydialogComponent,
    CategoryCardComponent,


   

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
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    Ng2Charts
  ],
  providers: [AuthService,{ provide: FirestoreSettingsToken, useValue: {} },ItemService,ItemAdditionService,MatDatepickerModule,UiService],
  bootstrap: [AppComponent],
  entryComponents:[NewglasswareComponent,
    NewchemicalsdialogComponent,
    QuantitydialogComponent,
    ChemicalquantitydialogComponent,
    NewperishablesComponent,
    LendingquantitydialogComponent,
    PeriqunatitydialogComponent,
    PermQuantitydialogComponent,
    NewpermEquipmentComponent]
})
export class AppModule { }
