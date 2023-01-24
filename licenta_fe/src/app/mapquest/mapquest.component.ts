import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocWrapper } from '../locations/location.model';
import { LocationsService } from '../services/locations/locations.service';
import { mapStyles } from './mapStyles';

@Component({
    selector: 'app-mapquest',
    templateUrl: './mapquest.component.html',
    styleUrls: ['./mapquest.component.css']
})
export class MapquestComponent implements OnInit {
    locationsSubscirption: Subscription | undefined;
    locationsObje?: LocWrapper;
    private sibiuGeo = {
        lat: 45.79,
        lng: 24.13
    };

    constructor(private locationsService: LocationsService) {}

    title = 'google-maps';
    private map!: google.maps.Map;

    ngOnInit(): void {
        this.loadMap();
    }

    loadMap() {
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

            // const marker = new google.maps.Marker({
            //     label: 'Sibiu',
            //     position: this.sibiuGeo,
            //     map: this.map
            // });
        });
    }

    fetchLocations() {}
}
