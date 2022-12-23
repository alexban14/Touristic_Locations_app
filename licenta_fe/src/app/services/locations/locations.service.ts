import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location, LocWrapper } from '../../locations/location.model';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private allLocationsEndpoint = '/locations/get';
    locationsObj?: LocWrapper;

    constructor(private http: HttpClient) {}

    getAllLocations() {
        return this.http.get<LocWrapper>(environment.baseURL + this.allLocationsEndpoint);
    }

    getOneLocation(id: string) {
        return this.http.get<LocWrapper>(environment.baseURL + this.allLocationsEndpoint + `/${id}`);
    }
}
