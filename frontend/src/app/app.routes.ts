import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ErrorComponent} from './error/error.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './services/guard/auth.guard';
import { StudentComponent } from './student/student/student.component';

export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: DashboardComponent},
  {path:'userboard', component: UserListComponent},
  {path:'profile', component: UserDetailsComponent},
  {path:'login', component: LoginComponent},
  {path:'error', component: ErrorComponent},
  {path: 'student', component: StudentComponent},
  {path:'**', redirectTo: 'error', pathMatch: 'full'},
];
