import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations.service';
import { Location, LocWrapper } from '../location.model';

@Component({
    selector: 'app-show-location',
    templateUrl: './show-location.component.html',
    styleUrls: ['./show-location.component.css']
})
export class ShowLocationComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationObj?: any;

    id = this.route.snapshot.paramMap.get('id');

    constructor(private locationsService: LocationsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        let locationWrapperObs;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe((response) => ((this.locationObj = response), console.log(response)));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
