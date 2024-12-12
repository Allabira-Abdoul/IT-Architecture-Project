import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user/user';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User = { id: 0, fullName: '', email: '', password: '', role: '', createdDate: new Date(), imageUrl: '' };
  isNewUser: boolean = true;  // Flag to differentiate create and edit mode
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User } // Optional user data for edit mode
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.user = this.data.user;
      this.isNewUser = false;
    }
  }

  imageUrlControl = new FormControl('');

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Handle the file, e.g., upload to a server or display a preview
    console.log(file);

    // Update the user's imageUrl property
    this.user.imageUrl = file.name; // Or use a more appropriate value, like a URL
  }

  onSubmit() {
    // Implement form submission logic here (e.g., call a service to create or update user)
    this.dialogRef.close(this.user); // Close the dialog and return the user object
  }

  onCancel() {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
