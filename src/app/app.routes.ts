import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UsersAuthGuard } from './authGuard/UsersAuthGuard';
import { PwdRecoveryComponent } from './authentication/pwdRecovery/pwd-recovery.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';

export const routes: Routes = [
    { path: '', redirectTo : '/authentication', pathMatch: 'full' },
    {path: 'reset-password', component: ResetPasswordComponent},
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'forgot-password', component: PwdRecoveryComponent}
        ]
    },
    {
        path: '',
        canActivate: [UsersAuthGuard],
        children: [
            { path: 'teachers', component: TeachersComponent },
            { path: 'classrooms', component: ClassroomsComponent },
        ]
    },
    { path: '**', component: NotFoundComponent},
];
