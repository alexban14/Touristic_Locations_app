import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OneLocWrapper, LocationSend, LocWrapper } from '../../locations/location.model';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private allLocationsEndpoint = '/locations/get';
    private createLocationEndpoint = '/locations/create';
    private editLocationEndpoint = '/locations/edit';
    locationsObj?: LocWrapper;

    constructor(private http: HttpClient) {}

    getAllLocations() {
        return this.http.get<LocWrapper>(environment.baseURL + this.allLocationsEndpoint);
    }

    getOneLocation(id: string) {
        return this.http.get<OneLocWrapper>(environment.baseURL + this.allLocationsEndpoint + `/${id}`);
    }

    createLocation(location: any) {
        return this.http.post(environment.baseURL + this.createLocationEndpoint, location, {
            observe: 'body',
            withCredentials: true
            // headers: new HttpHeaders().append('Content-Type', 'multipart/form-data')
        });
    }

    editLocation(location: LocationSend, id: string) {
        return this.http.put(environment.baseURL + this.editLocationEndpoint + `/${id}`, location, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    deleteLocation(id: string) {
        return this.http.delete(environment.baseURL + `/locations/delete/${id}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
}
