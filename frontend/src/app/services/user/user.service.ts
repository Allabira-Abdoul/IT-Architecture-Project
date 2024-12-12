import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {User} from '../../models/user/user';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  addUser(file: File, userDTO: User): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));

    return this.http.post(BASE_URL + 'api/user/save', formData, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  updateUser(file: File, userDTO: User): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', new Blob([JSON.stringify(userDTO)], { type: 'application/json' }));

    return this.http.put(BASE_URL + 'api/user/update/' + userDTO.id, formData, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<any> {
    return this.http.get(BASE_URL + 'api/user/' + id, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  getByToken(token:string): Observable<any>{
    return this.http.get(BASE_URL + 'api/auth?token='+ token).pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    return this.http.get(BASE_URL + 'api/user/all-users', {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.put(BASE_URL + 'api/user/delete/' + id, null, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    let headers = new HttpHeaders();

    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      headers = headers.set("Authorization", "Bearer " + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
