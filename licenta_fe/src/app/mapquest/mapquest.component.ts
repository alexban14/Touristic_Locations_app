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
                lng: location.location.long
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
                    // label: {
                    //     text: locationMarker.label,
                    //     className: 'marker-label'
                    // },
                    position: {
                        lat: locationMarker.lat,
                        lng: locationMarker.lng
                    },
                    icon: img
                });
                marker.setMap(this.map);
                google.maps.event.addListener(marker, 'click', () => {
                    window.alert('Makrer was clicked');
                });
            }
        });
    }
}

// const svgMarker = {
//     path: 'M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
//     fillColor: 'blue',
//     fillOpacity: 0.6,
//     strokeWeight: 0,
//     rotation: 0,
//     scale: 2,
//     anchor: new google.maps.Point(0, 20)
// };
