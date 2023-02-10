import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { OneEventWrapper } from '../event.model';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
    eventSubscription!: Subscription;
    eventObjToEdit!: OneEventWrapper;
    image: any;
    imgToUploadForm: FormData = new FormData();
    event_id = this.route.snapshot.paramMap.get('id');
    editedEvent: FormGroup;

    constructor(private eventsService: EventsService, private route: ActivatedRoute) {
        this.editedEvent = new FormGroup({
            name: new FormControl('', [Validators.minLength(4), Validators.maxLength(40), Validators.required]),
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            location: new FormGroup({
                lat: new FormControl('', [Validators.required]),
                long: new FormControl('', [Validators.required])
            }),
            ticket: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(1000)]),
            ticketsLink: new FormControl(''),
            description: new FormControl('', [Validators.minLength(100), Validators.maxLength(10000), Validators.required])
        });
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0];
        if (this.image) {
            this.imgToUploadForm.append('file', this.image);
        }
        console.log(event.target.files[0]);
    }

    ngOnInit(): void {}

    submitEditedEvent() {}
}
