import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckResponse, LocationAuthorResponse } from './checkRes.model';

@Injectable({
    providedIn: 'root'
})
export class CheckService {
    checkLoginStatusEndpoint = '/check/logStatus';
    checkLocationAuthorEndpoint = '/check/location';
    checkReviewAuthorEndpoint = '/check/review';

    constructor(private http: HttpClient) {}

    isLogedIn() {
        return this.http.get<CheckResponse>(environment.baseURL + this.checkLoginStatusEndpoint, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'aplication/json')
        });
    }

    isLocationAuthor(id: string) {
        return this.http.get<LocationAuthorResponse>(environment.baseURL + this.checkLocationAuthorEndpoint + `/${id}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'aplication/json')
        });
    }
}
