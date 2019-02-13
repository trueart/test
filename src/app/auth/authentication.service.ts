import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { loginModel } from './login.model';
import { AuthData } from './auth-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.tokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.tokenSubject.asObservable();
    }

    public get currentUserValue() {
        if(this.tokenSubject) {
            return true;
        } else {
            console.log('ici7=');
            return false;
        }
    }

    signUp(authdata: AuthData) {
        console.log('ici2=', authdata);
        const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                         'Access-Control-Allow-Methods': '*'});
        return this.http.post<any>(`http://localhost:3000/signup`, authdata, {headers: headers});
    }


    login(credentials:loginModel) {
        return this.http.post<any>(`http://localhost:3000/tokens`, credentials)
            .pipe(map(user => {console.log("responsetoken=", user);
                                    if (user && user.token){
                                        localStorage.setItem('currentUser', JSON.stringify(user));
                                        this.tokenSubject.next(user);
                                        return true;
                                    } else {
                                        console.log("erreur token auth service", );
                                        return false;
                                    }
                                  }
                ));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    }

    public isLoggedIn(){
        //console.log("isloggedin=");
        let jwtHelper = new JwtHelperService();
        let cU = localStorage.getItem('currentUser');
        if (cU){
            //console.log("icicici=");
            let tokenId = JSON.parse(cU).token;

            //console.log("tokenid=", tokenId);
            if (!tokenId) {
             //   console.log("icicici=");
                return false;
            } else {
                //console.log("token2=", tokenId);
                //let expirationDate = jwtHelper.getTokenExpirationDate(tokenId);
                let isExpired = jwtHelper.isTokenExpired(tokenId);
            
                //console.log("expirationDate=", expirationDate);
                //console.log("isExpired=", isExpired);
                return !isExpired;
            }
        } else {
            return false;
        }
    }


  
    /*get currentUser(){
        let jwtHelper = new JwtHelperService();
        let token = localStorage.getItem('token');
        if (!token) return null;

        var toto =  jwtHelper.decodeToken(token);
        console.log(toto);
        return jwtHelper.decodeToken(token);
    }*/
}