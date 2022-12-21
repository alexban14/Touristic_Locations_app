import { ActionReducerMap } from '@ngrx/store';
import * as fromLocations from '../locations/store/locations.reducer';
import * as LocationActions from '../locations/store/locations.actions';

export interface AppState {
    locations: fromLocations.State;
}

export const appReducer: ActionReducerMap<AppState, LocationActions.LocationsActions> = {
    locations: fromLocations.locationsReducer
};
