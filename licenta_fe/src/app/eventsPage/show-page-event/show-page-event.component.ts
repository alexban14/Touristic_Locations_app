import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { environment } from 'src/environments/environment';
import { Event, OneEventWrapper } from '../event.model';
import { eventMapStyles } from 'src/app/mapquest/mapStylesEvent';
import { CheckService, EventAuthorResponse } from 'src/app/services/checking/check.service';
import { response } from 'express';

@Component({
    selector: 'app-show-page-event',
    templateUrl: './show-page-event.component.html',
    styleUrls: ['./show-page-event.component.css']
})
export class ShowPageEventComponent implements OnInit {
    event_id = this.route.snapshot.paramMap.get('id');
    subscription!: Subscription;
    authorStatusSub!: Subscription;
    isAuthor!: boolean;
    loginStatusSub!: Subscription;
    eventObj!: Event;

    constructor(private eventsService: EventsService, private checkService: CheckService, private route: ActivatedRoute, private _router: Router) {}

    ngOnInit(): void {
        if (typeof this.event_id === 'string') {
            this.subscription = this.eventsService.getOneEvent(this.event_id).subscribe({
                next: (response: OneEventWrapper) => {
                    console.log(response);
                    this.eventObj = response.event;
                    this.loadMap(response.event);
                },
                error: (err) => console.log(err)
            });

            this.authorStatusSub = this.checkService.isEventAuthor(this.event_id).subscribe({
                next: (response: EventAuthorResponse) => {
                    this.isAuthor = response.eventAuthor;
                },
                error: (err) => console.log(err)
            });
        }
    }

    deleteEvent() {
        if (typeof this.event_id === 'string') {
            this.eventsService.deleteEvent(this.event_id);
            this._router.navigate(['/events/get']);
        }
    }

    title = 'google-maps';
    private map!: google.maps.Map;

    loadMap(event: Event) {
        let loader = new Loader({
            apiKey: environment.googleAPI_KEY
        });

        loader.load().then(() => {
            console.log('Loaded map');

            this.map = new google.maps.Map(document.getElementById('map')!, {
                center: {
                    lat: event.location.lat,
                    lng: event.location.long
                },
                zoom: 14,
                styles: eventMapStyles
            });

            const img = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            const marker = new google.maps.Marker({
                title: event.name,
                position: {
                    lat: event.location.lat,
                    lng: event.location.long
                },
                icon: img
            });
            marker.setMap(this.map);
        });
    }
}
