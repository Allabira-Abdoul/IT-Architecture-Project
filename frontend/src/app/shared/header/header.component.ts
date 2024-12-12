import { Component } from '@angular/core';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: User = JSON.parse(localStorage.getItem('it-architecture-user') ?? '{}');
  source="http://localhost:8080/api/images/"

}
