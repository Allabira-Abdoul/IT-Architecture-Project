import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import {Login} from '../../models/user/login';

const BASE_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router ) { }

  logout(){
    localStorage.removeItem("it-architecture-token")
    localStorage.removeItem("it-architecture-user")
    this.router.navigate(['/login']);
  }

  login(login:Login): Observable<any> {
    return this.http.post<any>(`${BASE_URL}api/auth/login`, login)
  }

  // Method to check if user is authenticated
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('it-architecture-token'); // Or use a more secure storage method

    if (!token) {
      return of(false);
    }

    return this.http.get(`${BASE_URL}api/auth/validate?token=${token}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }



}
