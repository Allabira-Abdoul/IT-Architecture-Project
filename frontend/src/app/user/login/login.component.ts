import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {Login} from '../../models/user/login';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup

  errorMessage: string = '';

  login!:Login

  constructor( private router: Router ,
               private authService : AuthService,
               private userService : UserService,
               private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if(this.loginForm.valid){
      this.login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(this.login).subscribe(
        (response) => {
          if (response.text !== 'invalid access'){
            // alert("hello"+ response.text);
            const  jwtToken = response.text;

            localStorage.setItem('it-architecture-token',jwtToken)
            this.userService.getByToken(jwtToken).subscribe(
              (response ) => {
                const user = response
                localStorage.setItem('it-architecture-user',JSON.stringify(user))

              }
            )
            this.router.navigate(['/home']);

          } else {
            this.errorMessage = 'Invalid credentials, please try again';
          }
        },
        (error) => {
          this.errorMessage = 'Invalid credentials, please try again';
        } );
    }
  }
}
