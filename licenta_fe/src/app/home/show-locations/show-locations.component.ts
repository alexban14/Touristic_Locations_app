import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { LocWrapper, Location } from 'src/app/locations/location.model';
import { LocationsService } from 'src/app/services/locations/locations.service';

@Component({
    selector: 'show-locations',
    templateUrl: './show-locations.component.html',
    styleUrls: ['./show-locations.component.css']
})
export class ShowLocationsComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationsObj?: LocWrapper;
    locationsArr: Location[] = [];

    constructor(private locationsService: LocationsService) {}

    ngOnInit(): void {
        const locationWrapperObs: Observable<LocWrapper> = this.locationsService.getAllLocations();

        this.subscription = locationWrapperObs.subscribe((response) => {
            this.locationsObj = response;
            for (let i = 0; i < 3; i++) {
                this.locationsArr.push(this.locationsObj.locations[i]);
            }
            console.log(this.locationsArr);
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
