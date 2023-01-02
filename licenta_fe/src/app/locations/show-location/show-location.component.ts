import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations/locations.service';
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

    constructor(private locationsService: LocationsService, private route: ActivatedRoute, private _router: Router) {}

    ngOnInit(): void {
        let locationWrapperObs;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe((response) => ((this.locationObj = response), console.log(response)));
    }

    locationDelete() {
        if (typeof this.id === 'string') {
            this.locationsService.deleteLocation(this.id).subscribe({
                next: (res: any) => console.log(res),
                error: (err) => console.log(err)
            });
        }
        this._router.navigate(['/locations/get']);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
