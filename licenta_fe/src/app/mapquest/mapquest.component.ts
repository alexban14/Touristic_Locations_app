import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    id: string;
    description: string;
}

@Component({
    selector: 'app-mapquest',
    templateUrl: './mapquest.component.html',
    styleUrls: ['./mapquest.component.css']
})
export class MapquestComponent implements OnInit, OnDestroy {
    @ViewChild('locationModal', { static: false }) locationModal: any;

    locationsSubscirption: Subscription | undefined;
    locationsObj?: LocWrapper;
    locationsMarkers: locationMarker[] = [];
    private sibiuGeo = {
        lat: 45.79,
        lng: 24.13
    };

    constructor(private locationsService: LocationsService, private _router: Router) {}

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
                (this.locationsObj = response), /*console.log(this.locationsObj),*/ this.mapLocationsInfo(this.locationsObj);
            },
            error: (error) => console.log(error)
        });
    }

    mapLocationsInfo(locationsObj: LocWrapper) {
        for (let location of locationsObj.locations) {
            let oneLocMarker = {
                label: location.name,
                lat: location.location.lat,
                lng: location.location.long,
                id: location._id,
                description: location.description
            };
            this.locationsMarkers.push(oneLocMarker);
        }
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
                zoom: 10,
                styles: mapStyles
            });

            const img = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            for (let locationMarker of locationsMarkers) {
                const marker = new google.maps.Marker({
                    title: locationMarker.label,
                    position: {
                        lat: locationMarker.lat,
                        lng: locationMarker.lng
                    },
                    icon: img
                });
                marker.setMap(this.map);

                const contentString =
                    '<div id="content">' +
                    '<div class="card" style="width: 18rem;">' +
                    '<div class="card-body">' +
                    `<h5 class="card-title">${locationMarker.label}</h5>` +
                    `<p class="card-text">${locationMarker.description}</p>` +
                    `<a href=http://localhost:4200/locations/get/${locationMarker.id}><button class="btn btn-outline-primary">Detalii</button></a>` +
                    '</div>' +
                    '</div>' +
                    '</div>';

                const infoWindow = new google.maps.InfoWindow({
                    content: contentString,
                    ariaLabel: 'Urlu'
                });

                google.maps.event.addListener(marker, 'click', () => {
                    infoWindow.open({
                        anchor: marker,
                        map: this.map
                    });
                });
            }
        });
    }
}
