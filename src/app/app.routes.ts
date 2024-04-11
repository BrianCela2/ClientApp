import { Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { DashboardComponent } from './components/tables/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EditUserComponent } from './components/forms/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'updateUser', component: EditUserComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
