import { Routes,RouterModule, } from '@angular/router';
import {StudentComponent} from './student/student/student.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
