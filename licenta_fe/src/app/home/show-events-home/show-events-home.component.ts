import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Subscription, take } from 'rxjs';
import { Event, EventWrapper } from 'src/app/eventsPage/event.model';
import { EventsService } from 'src/app/services/eventsPage/events.service';

@Component({
    selector: 'app-show-events-home',
    templateUrl: './show-events-home.component.html',
    styleUrls: ['./show-events-home.component.css']
})
export class ShowEventsHomeComponent implements OnInit {
    eventsSub!: Subscription;
    eventsSerSub!: Subscription;
    eventsFetched!: EventWrapper;
    eventsArr: Event[] = [];

    constructor(private eventsService: EventsService) {}

    ngOnInit(): void {
        const currentTimeMilli = new Date();
        this.eventsSub = this.eventsService.eventsByStartDate(currentTimeMilli.getTime()).subscribe({
            next: (response: EventWrapper) => {
                console.log(response);
                this.eventsFetched = response;
                for (let i = 0; i < 3; i++) {
                    this.eventsArr.push(this.eventsFetched.events[i]);
                }
                console.log(this.eventsArr);
            },
            error: (err) => console.log(err)
        });
    }
}
