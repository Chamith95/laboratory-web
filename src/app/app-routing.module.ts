import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './users/sign-in/sign-in.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from "./guards/secure-inner-pages.guard";
import { AuthGuard } from "./guards/auth.guard";
import { VerifyEmailComponent } from './users/verify-email/verify-email.component';


// routes
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { NewglasswareComponent } from './items/glassware/newglassware/newglassware.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboardmain', component: DashboardMainComponent},
  { path: 'glasswarecreation', component: NewglasswareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
