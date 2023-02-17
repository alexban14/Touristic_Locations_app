import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class CheckResponse {
    logedIn: boolean;

    constructor(logedIn: boolean) {
        this.logedIn = logedIn;
    }
}

export class LocationAuthorResponse {
    locationAuthor: boolean;

    constructor(locationAuthor: boolean) {
        this.locationAuthor = locationAuthor;
    }
}

export class EventAuthorResponse {
    eventAuthor: boolean;

    constructor(eventAuthor: boolean) {
        this.eventAuthor = eventAuthor;
    }
}

export class UserRes {
    logedInUser: string;

    constructor(logedInUser: string) {
        this.logedInUser = logedInUser;
    }
}

@Injectable({
    providedIn: 'root'
})
export class CheckService {
    checkLoginStatusEndpoint = '/check/logStatus';
    checkLocationAuthorEndpoint = '/check/location';
    checkEventAuthorEndpoint = '/check/event';
    checkReviewAuthorEndpoint = '/check/review';
    checkLogedInUserEndpoint = '/check/user';

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

    isEventAuthor(id: string) {
        return this.http.get<EventAuthorResponse>(environment.baseURL + this.checkEventAuthorEndpoint + `/${id}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'aplication/json')
        });
    }

    isReviewAuthor(id: string) {
        return this.http.get(environment.baseURL + this.checkReviewAuthorEndpoint + `${id}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'aplication/json')
        });
    }

    logedInUser() {
        return this.http.get<UserRes>(environment.baseURL + this.checkLogedInUserEndpoint, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'aplication/json')
        });
    }
}
