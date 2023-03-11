import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventWrapper } from '../eventsPage/event.model';
import { LocWrapper } from '../locations/location.model';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    logedIn = new BehaviorSubject<boolean>(false);
    currentLogedIn = this.logedIn.asObservable();

    events = new Subject<EventWrapper>();
    currentEvents = this.events.asObservable();

    locations = new Subject<LocWrapper>();
    currentLocations = this.locations.asObservable();

    constructor() {}

    changeLogedIn(logedInStatus: boolean) {
        this.logedIn.next(logedInStatus);
    }

    changeEvents(newFetchedEvents: EventWrapper) {
        this.events.next(newFetchedEvents);
    }

    changeLocations(newLocationsFetched: LocWrapper) {
        this.locations.next(newLocationsFetched);
    }
}
