import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-details',
  imports: [
    FormsModule
  ],
  templateUrl: './user-details.component.html',
  standalone: true,
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  isEditing: boolean = false;
  user!:User

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('it-architecture-user') ?? '{}');

  }

  profileFields: { key: keyof User; label: string; type: string }[] = [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'createdDate', label: 'Created Date', type: 'text' },
  ];


  originalUser = { ...this.user };

  toggleEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.isEditing = false;
    alert('Changes saved successfully!');
  }

  cancelEdit(): void {
    this.user = { ...this.originalUser };
    this.isEditing = false;
  }
}
