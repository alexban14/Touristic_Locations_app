import { Component, OnDestroy, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocWrapper } from '../locations/location.model';
import { LocationsService } from '../services/locations/locations.service';
import { mapStyles } from './mapStyles';

export interface locationMarker {
    label: string;
    lat: number;
    lng: number;
}

@Component({
    selector: 'app-mapquest',
    templateUrl: './mapquest.component.html',
    styleUrls: ['./mapquest.component.css']
})
export class MapquestComponent implements OnInit, OnDestroy {
    locationsSubscirption: Subscription | undefined;
    locationsObj?: LocWrapper;
    locationsMarkers: locationMarker[] = [];
    private sibiuGeo = {
        lat: 45.79,
        lng: 24.13
    };

    constructor(private locationsService: LocationsService) {}

    title = 'google-maps';
    private map!: google.maps.Map;

    ngOnInit(): void {
        this.fetchLocations();
    }

    ngOnDestroy(): void {
        this.locationsSubscirption?.unsubscribe();
    }

    fetchLocations() {
        const locationWrapperObs: Observable<LocWrapper> = this.locationsService.getAllLocations();

        this.locationsSubscirption = locationWrapperObs.subscribe({
            next: (response) => {
                (this.locationsObj = response), console.log(this.locationsObj), this.mapLocationsInfo(this.locationsObj);
            },
            error: (error) => console.log(error)
        });
    }

    mapLocationsInfo(locationsObj: LocWrapper) {
        for (let location of locationsObj.locations) {
            let oneLocMarker = {
                label: location.name,
                lat: location.location.lat,
                lng: location.location.long
            };
            this.locationsMarkers.push(oneLocMarker);
        }
        console.log(this.locationsMarkers);
        this.loadMap(this.locationsMarkers);
    }

    loadMap(locationsMarkers: locationMarker[]) {
        let loader = new Loader({
            apiKey: environment.googleAPI_KEY
        });

        loader.load().then(() => {
            console.log('Loaded map');

            this.map = new google.maps.Map(document.getElementById('map')!, {
                center: this.sibiuGeo,
                zoom: 12,
                styles: mapStyles
            });

            const marker = new google.maps.Marker({
                label: 'Sibiu',
                position: this.sibiuGeo,
                map: this.map
            });
            for (let locationMarker of locationsMarkers) {
                const marker = new google.maps.Marker({
                    label: locationMarker.label,
                    position: {
                        lat: locationMarker.lat,
                        lng: locationMarker.lng
                    }
                });
                console.log(marker);
            }
        });
    }
}
