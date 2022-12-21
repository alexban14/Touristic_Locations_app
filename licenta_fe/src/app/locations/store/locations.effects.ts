import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { Location } from '../location.model';
import * as LocationsActions from './locations.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, switchMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocationsEffects {
    getLocationsEndPoint = '/locations/get';
    createLocationEndPoint = '/locations/create';

    fetchLocations = createEffect(() => {
        return this.actions$.pipe(
            ofType(LocationsActions.FETCH_LOCATIONS),
            switchMap((fetchAction) => {
                return this.http.get<Location[]>(environment.baseURL + this.getLocationsEndPoint);
            }),
            map((locations) => {
                return locations.map((location) => {
                    return {
                        ...location,
                        reviews: location.reviews ? location.reviews : []
                    };
                });
            }),
            map((locations) => {
                return new LocationsActions.SetLocations(locations);
            })
        );
    });

    // saveLocations = createEffect((): any => {
    //     ofType(LocationsActions.SAVE_LOCATIONS),
    //         withLatestFrom(this.store.select('locations')),
    //         switchMap(([actionData, locationState]) => {
    //             return this.http.post(environment.baseURL + this.createLocationEndPoint, locationState.locations);
    //         }),
    //         { dispatch: false };
    // });

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
