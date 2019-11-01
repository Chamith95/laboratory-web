import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from "../guards/secure-inner-pages.guard";
import { AuthGuard } from "../guards/auth.guard";
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [SecureInnerPagesGuard]
    },
    {
        path: 'register-user',
        component: SignUpComponent,
        canActivate: [SecureInnerPagesGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [SecureInnerPagesGuard]
    },
    {
        path: 'verify-email-address',
        component: VerifyEmailComponent,
        canActivate: [SecureInnerPagesGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }