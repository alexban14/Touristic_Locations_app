import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterUser, LoginUser } from 'src/app/auth/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private registerEndpoint = '/auth/register';
    private loginEndpoint = '/auth/login';
    private logoutEndpoint = '/auth/logout';

    constructor(private http: HttpClient, private _router: Router) {}

    register(user: RegisterUser) {
        return this.http.post(environment.baseURL + this.registerEndpoint, user, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    login(user: LoginUser) {
        return this.http.post(environment.baseURL + this.loginEndpoint, user, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    logout() {
        return this.http.get(environment.baseURL + this.logoutEndpoint, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
}
