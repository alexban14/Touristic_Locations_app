import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { environment } from 'src/environments/environment';
import { Location, LocWrapper } from '../location.model';

@Component({
    selector: 'app-list-locations',
    templateUrl: './list-locations.component.html',
    styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationsObj?: LocWrapper;

    constructor(private locationsService: LocationsService) {}

    ngOnInit(): void {
        const locationWrapperObs: Observable<LocWrapper> = this.locationsService.getAllLocations();

        this.subscription = locationWrapperObs.subscribe((response) => {
            this.locationsObj = response;
            console.log(response);
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}

// .pipe(
//   map(response => {
//       reducer.setLocations(response)
//       return response;
//   }),
//   catchError((error) => {
//       reducer.setLocationsError(error);
//         console.log('error', error);
//         return of();
//     })
// );

// *ngFor="let location of (subscription | async)?.locations"
