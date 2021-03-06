import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from "./guards/secure-inner-pages.guard";
import { AuthGuard } from "./guards/auth.guard";
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';


// routes
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { NewglasswareComponent } from './items/glassware/newglassware/newglassware.component';
import { GlasswarelistComponent } from './items/glassware/glasswarelist/glasswarelist.component';
import {AddnewcartComponent} from  './items/addnewcart/addnewcart.component'
import {AddhistoryComponent} from './items/addhistory/addhistory.component'
import { RemovalcartComponent } from './items/removalcart/removalcart.component';
import { RemhistoryComponent } from './items/remhistory/remhistory.component';
import { ChemicallistComponent } from './items/chemicals/chemicallist/chemicallist.component';
import { LendingMainFormComponent } from './lending_items/lending-main-form/lending-main-form.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { PerishablelistComponent } from './items/perishables/perishablelist/perishablelist.component';
import { PermEquiplistComponent } from './items/permEquipment/perm-equiplist/perm-equiplist.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CurrentLendingsComponent } from './lending_items/current-lendings/current-lendings.component';
import { PastLendingsComponent } from './lending_items/past-lendings/past-lendings.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule',
  },
  { path: 'dashboardmain', component: DashboardMainComponent},
  { path: 'glasswarecreation', component: NewglasswareComponent},
  { path: 'Glasswarelist', component: GlasswarelistComponent,canActivate:[AuthGuard]},
  { path: 'Addnewcart' ,component:AddnewcartComponent},
  { path: 'AddHistory' ,component:AddhistoryComponent},
  { path: 'Removalcart',component:RemovalcartComponent },
  { path: 'RemovalHistory',component:RemhistoryComponent},
  { path: 'Chemicallist',component:ChemicallistComponent},
  { path: 'Perishablelist',component:PerishablelistComponent},
  { path: 'PermEquiplist',component:PermEquiplistComponent},
  { path: 'lendingform',component:LendingMainFormComponent},
  { path: 'TeachersMain',component:TeachersComponent},
  { path: 'CurrentLendings',component:CurrentLendingsComponent},
  { path: 'PastLendings',component:PastLendingsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
