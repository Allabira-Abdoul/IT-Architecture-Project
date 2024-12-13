import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user/user';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatDialogContent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  user: User = { id: 0, fullName: '', email: '', password: '', role: '', createdDate: new Date(), imageUrl: '' };
  isNewUser: boolean = true;  // Flag to differentiate create and edit mode
  userForm!: FormGroup;
  file?: File;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User }, // Optional user data for edit mode
    private fb: FormBuilder
  ) {
    if (this.data && this.data.user) {
      this.user = this.data.user;
      this.isNewUser = false;
      this.userForm = this.fb.group({
        id: [this.user.id],
        fullName: [this.user.fullName,[Validators.required]],
        email: [this.user.email, [Validators.required]],
        password: [this.user.password, [Validators.required]],
        role: [this.user.role,[Validators.required]],
        createdDate: [this.user.createdDate],
        imageUrl:[this.user.imageUrl]
      })
    }
    this.userForm = this.fb.group({
      id: [0],
      fullName: ['',[Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['USER'],
      createdDate: [''],
      imageUrl:['']
    })
  }

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.user = this.data.user;
      this.isNewUser = false;
    }
  }

  imageUrlControl = new FormControl('');

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Handle the file, e.g., upload to a server or display a preview
    console.log(file);

    // Update the user's imageUrl property
    this.user.imageUrl = file.name; // Or use a more appropriate value, like a URL
  }

  onSubmit() {
    if(this.userForm.valid){
    this.dialogRef.close(this.user); // Close the dialog and return the user object
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
