import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user!: User;

  constructor(public router: Router, private authService: AuthService) {
    let userString = localStorage.getItem('it-architecture-user')

    if(userString){
    this.user = JSON.parse(userString)
    }
  }

  logout() {
    this.authService.logout()
  }
}
