import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { ServerMediatorService } from '../application/server-mediator.service';
import { authUser } from './authUser.model';

interface authResponse {
  idToken : String;
  email : String;
  refreshToken : String;
  expiresIn : String;
  localId : String;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  logoutTimer : any;
  isAuthenticated = false;
  user = new BehaviorSubject<authUser>(null);

  constructor(
    private http : HttpClient,
    private router : Router,
    private injector : Injector
    ) {
      
     }

  signup(email : String, password : any){
    return this.http.post<authResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUQ1PyZUYN6Uv3Ptx1IGaa8rhUwH7vvCw",
      {
        email : email,
        password : password,
        returnSecureToken : true
      }
    ).pipe(
      catchError(this.errorHandler),
      tap( (respData) => {
        this.handleAuthUser(respData.localId, respData.email, respData.expiresIn, respData.expiresIn)
      })
    )
  }

  signin(email : String, password : any){
    return this.http.post<authResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUQ1PyZUYN6Uv3Ptx1IGaa8rhUwH7vvCw",
      {
        email : email,
        password : password,
        returnSecureToken : true
      }
    ).pipe(
      catchError(this.errorHandler),
      tap( (respData) => {
        this.handleAuthUser(respData.localId, respData.email, respData.idToken, respData.expiresIn)
      })
    )
  }

  logout(){
    const server = this.injector.get(ServerMediatorService)
    server.userData = [];
    this.user.next(null)
    this.router.navigate(['/'])
    localStorage.removeItem('authUser')
    clearTimeout(this.logoutTimer);
    location.reload();
  }

  autoLogin(){
    const userFromLocalstorage : any = JSON.parse(localStorage.getItem('authUser'));
    if(userFromLocalstorage == null){
      return
    }
    const user = new authUser(
      userFromLocalstorage.userId,
      userFromLocalstorage.email,
      userFromLocalstorage._token,
      userFromLocalstorage._expiresIn
    )
 
    if(user.token){
      this.user.next(user)
      let BalanceExpirationSeconds = new Date(userFromLocalstorage._expiresIn).getTime() - new Date().getTime()
      this.autoLogout(BalanceExpirationSeconds)
      this.router.navigate(['home'])
    }
  }

  autoLogout(expirationSeconds : number){
    this.logoutTimer = setTimeout( () => {
      this.logout()
    }, expirationSeconds)
  }

  private errorHandler(errorResp){
    let errorMessage ;
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.'
      break;
          
      case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project'
      break;

      default:
      errorMessage = 'Unexpected Error Occured'
      break;
    }
    return throwError(errorMessage)
  }

  private handleAuthUser(localId, email, idToken, expiresIn){
    const expirationDate = new Date(new Date().getTime())
    expirationDate.setSeconds(+expiresIn)
    const user = new authUser(
      localId,
      email,
      idToken,
      expirationDate
    )
    this.user.next(user)
    localStorage.setItem('authUser', JSON.stringify(user))
    this.autoLogout(expiresIn * 1000)
    this.router.navigate(['home'])
  }

}
