import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './user-details.component.html',
  standalone: true,
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  isEditing: boolean = false;
  user!:User
  originalUser!: User

  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('it-architecture-user') ?? '{}');
    this.originalUser = { ...this.user };
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('it-architecture-user') ?? '{}');
  }

  profileFields: { key: keyof User; label: string; type: string }[] = [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'createdDate', label: 'Created Date', type: 'text' },
  ];



  toggleEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.isEditing = false;
    localStorage.setItem('it-architecture-user', JSON.stringify(this.user))
    alert('Changes saved successfully!');
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.isEditing = false;
  }
}
