import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { Event, OneEventWrapper } from '../event.model';

@Component({
    selector: 'app-show-page-event',
    templateUrl: './show-page-event.component.html',
    styleUrls: ['./show-page-event.component.css']
})
export class ShowPageEventComponent implements OnInit {
    event_id = this.route.snapshot.paramMap.get('id');
    subscription!: Subscription;
    authorStatusSub!: Subscription;
    loginStatusSub!: Subscription;
    eventObj!: Event;

    constructor(private eventsService: EventsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        if (typeof this.event_id === 'string')
            this.subscription = this.eventsService.getOneEvent(this.event_id).subscribe({
                next: (response: OneEventWrapper) => {
                    console.log(response);
                    this.eventObj = response.event;
                },
                error: (err) => console.log(err)
            });
    }
}
