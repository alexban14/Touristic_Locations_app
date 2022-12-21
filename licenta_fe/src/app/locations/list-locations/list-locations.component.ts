import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Location } from '../location.model';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-list-locations',
    templateUrl: './list-locations.component.html',
    styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit {
    locations: Location[] | undefined;
    subscription: Observable<Location> | undefined;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.subscription = this.store.select('locations').pipe((locationState) => locationState.locations);
    }
}
