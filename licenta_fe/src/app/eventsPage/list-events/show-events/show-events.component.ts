import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { EventWrapper } from '../../event.model';

@Component({
    selector: 'app-show-events',
    templateUrl: './show-events.component.html',
    styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit, OnDestroy {
    eventsSub!: Subscription;
    eventsSerSub!: Subscription;
    displayEvents!: EventWrapper;

    constructor(private dataStorage: DataStorageService, private eventService: EventsService) {}

    ngOnInit(): void {
        this.fetchInitialEvents();
        this.fetchEvents();
    }

    ngOnDestroy(): void {
        this.eventsSub.unsubscribe();
        this.eventsSerSub.unsubscribe();
    }

    fetchInitialEvents() {
        this.eventsSerSub = this.eventService.getAllEvents().subscribe({
            next: (response: EventWrapper) => {
                console.log(response), this.dataStorage.changeEvents(response);
            },
            error: (err) => console.log(err)
        });
    }

    fetchEvents() {
        this.eventsSub = this.dataStorage.currentEvents.subscribe({
            next: (response: EventWrapper) => {
                console.log(response), (this.displayEvents = response);
            }
        });
    }
}
