import { Routes } from '@angular/router';
import { LoginComponent } from './components/forms/login/login.component';
import { SignupComponent } from './components/forms/signup/signup.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent}
];
