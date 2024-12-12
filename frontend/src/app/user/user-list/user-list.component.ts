import { Component } from '@angular/core';
import {User} from '../../models/user/user';
import {CommonModule, DatePipe} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {UserFormComponent} from '../user-form/user-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
source="http://localhost:8080/api/images/"

  users: User[] = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: '********',
      role: 'Admin',
      createdDate: new Date(),
      imageUrl: 'akali_1.jpg'
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: '********',
      role: 'User',
      createdDate: new Date(),
      imageUrl: 'akali_1.jpg'
    },
    // Add more users as needed
  ];

  constructor(private dialog: MatDialog,private userService: UserService) {
    this.fetchUsers()
  }

  ngOnInit(): void {}

  fetchUsers(){
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

  updateUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {data: {user}});
    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.userService.updateUser(updatedUser, updatedUser.imageUrl) // Pass the file as well
          .subscribe(() => {

            this.fetchUsers()
          });
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        this.fetchUsers()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  createUser() {
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.userService.addUser(newUser, newUser.imageUrl) // Pass the file as well
          .subscribe(createdUser => {
            this.users.push(createdUser);
          });
      }
    });
  }
}
