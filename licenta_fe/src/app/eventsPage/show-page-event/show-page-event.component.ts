import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { environment } from 'src/environments/environment';
import { Event, OneEventWrapper } from '../event.model';
import { eventMapStyles } from 'src/app/mapquest/mapStylesEvent';

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
                    this.loadMap(response.event);
                },
                error: (err) => console.log(err)
            });
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
