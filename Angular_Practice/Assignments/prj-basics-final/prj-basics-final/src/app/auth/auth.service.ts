import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";



export interface AuthResponseData{
    kind: string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:any;
    localId:string;
    registered?: boolean;
}


@Injectable({providedIn:'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);

    constructor(private http:HttpClient, private router: Router,){}

    signUp(email:string, password:string){
        
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId,resData.idToken, +resData.expiresIn)
            
        }));
    }

    login(email:string, password:string){

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId,resData.idToken, +resData.expiresIn)
            
        }));
    }

    autoLogin(){
        const userData:{
            email: string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(!loadedUser.token){
            this.user.next(loadedUser);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth'])
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
        const expiresDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expiresDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMsg = 'An unknown error occurred'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL EXISTS':
                    errorMsg = 'This email exists already';
                    break;
                case 'EMAIL NOT FOUND':
                    errorMsg = 'This email does not exist';
                    break;
                case 'INVALID PASSWORD':
                    errorMsg = 'This password is not correct';
                    break;
            }
            return throwError(errorMsg);
    }
  
}