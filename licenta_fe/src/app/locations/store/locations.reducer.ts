import { Location } from '../location.model';
import * as LocationsActions from './locations.actions';

export interface State {
    locations: Location[];
}

const initialState: State = {
    locations: []
};

export function locationsReducer(state = initialState, action: LocationsActions.LocationsActions) {
    switch (action.type) {
        case LocationsActions.SET_LOCATIONS:
            return {
                ...state,
                locations: [...action.payload]
            };
        case LocationsActions.CREATE_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.payload]
            };
        case LocationsActions.UPDATE_LOCATION:
            const updatedLocation = {
                ...state.locations[action.payload.index],
                ...action.payload.newLocation
            };

            const updateLocations = [...state.locations];
            updateLocations[action.payload.index] = updatedLocation;

            return {
                ...state,
                locations: updateLocations
            };
        case LocationsActions.DELETE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter((location, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}
