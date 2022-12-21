import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    message: any;

    constructor(@Inject(String) private url: string, private http: HttpClient) {}

    getAllLocations() {
        return this.http.get(this.url).pipe(
            catchError((error) => (this.message = error.message)),
            map((response) => response)
        );
    }
}
