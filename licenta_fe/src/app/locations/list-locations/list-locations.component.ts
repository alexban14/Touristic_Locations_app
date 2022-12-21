import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from '../location.model';

@Component({
    selector: 'app-list-locations',
    templateUrl: './list-locations.component.html',
    styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {
    locations: any;

    constructor(private locationsService: LocationsService) {}

    ngOnInit(): void {
        this.locationsService.getAllLocations().subscribe((locations) => ((this.locations = locations), console.log(locations)));
    }
}
