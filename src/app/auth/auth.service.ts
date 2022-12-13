import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>()
  constructor(private http: HttpClient) {
  }
  
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYtnOosnHA-FEBDUK9O61qrx8RJIT1yj8',
      { email, password, returnSecureToken: true })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
      ));
  }
  
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYtnOosnHA-FEBDUK9O61qrx8RJIT1yj8',
      { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }
        ));
  }
  
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
  
    this.user.next(user);
  }
  
  private handleError(errorRes: HttpErrorResponse) {
    let error = "An unkown error"
    if (!errorRes.error?.error?.errors) return throwError(error);
  
    switch (errorRes.error.error.errors) {
      case 'EMAIL_EXISTS':
        error = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        error = 'The password is invalid or the user does not have a password.'
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administrator'
        break;
      default:
        break;
    }
  
    return throwError(error);
  }
}
