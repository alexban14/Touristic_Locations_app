import { Component, OnDestroy, OnInit } from '@angular/core';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { EventWrapper } from '../../event.model';

@Component({
    selector: 'app-show-events',
    templateUrl: './show-events.component.html',
    styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit, OnDestroy {
    eventsSub!: Subscription;
    displayEvents!: EventWrapper;

    constructor(private dataStorage: DataStorageService) {}

    ngOnInit(): void {
        this.eventsSub = this.dataStorage.currentEvents.subscribe({
            next: (response: EventWrapper) => {
                console.log(response), (this.displayEvents = response);
            }
        });
    }

    ngOnDestroy(): void {
        this.eventsSub.unsubscribe();
    }
}
