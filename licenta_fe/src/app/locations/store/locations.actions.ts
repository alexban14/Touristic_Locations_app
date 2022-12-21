import { Action } from '@ngrx/store';
import { Location } from '../location.model';

export const SET_LOCATIONS = '[Locations] Set Locations';
export const FETCH_LOCATIONS = '[Locations] Fetch Locations';
export const CREATE_LOCATION = '[Locations] Create Location';
export const UPDATE_LOCATION = '[Locations] Update Location';
export const SAVE_LOCATIONS = '[Locations] Save Location';
export const DELETE_LOCATION = '[Locations] Delete Location';

export class SetLocations implements Action {
    readonly type = SET_LOCATIONS;

    constructor(public payload: Location[]) {}
}

export class FetchLocations implements Action {
    readonly type = FETCH_LOCATIONS;

    constructor(public payload: Location[]) {}
}

export class SaveLocations implements Action {
    readonly type = SAVE_LOCATIONS;
}

export class CreateLocation implements Action {
    readonly type = CREATE_LOCATION;

    constructor(public payload: Location) {}
}

export class UpdateLocation implements Action {
    readonly type = UPDATE_LOCATION;

    constructor(public payload: { index: number; newLocation: Location }) {}
}

export class DeleteLocation implements Action {
    readonly type = DELETE_LOCATION;

    constructor(public payload: number) {}
}

export type LocationsActions = SetLocations | FetchLocations | SaveLocations | CreateLocation | UpdateLocation | DeleteLocation;
