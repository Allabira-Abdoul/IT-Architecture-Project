import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ErrorComponent} from './error/error.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './services/guard/auth.guard';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'userboard', component: UserListComponent, canActivate: [AuthGuard]},
  {path:'profile', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'error', component: ErrorComponent},
  {path:'**', redirectTo: 'error', pathMatch: 'full'},
];
