import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { ImgUploadService } from 'src/app/services/locations/img-upload.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
    createEventForm: FormGroup;
    image: any;
    imgToUploadForm: FormData = new FormData();
    formDataToSend: FormData = new FormData();
    fileName: string = '';

    constructor(private imgUploadService: ImgUploadService, private eventsService: EventsService, private _router: Router) {
        this.createEventForm = new FormGroup({
            name: new FormControl('', [Validators.minLength(4), Validators.maxLength(40), Validators.required]),
            // startDate: new FormControl('', Validators.required),
            // endDate: new FormControl('', Validators.required),
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

        this.createEventForm.valueChanges.subscribe(console.log);
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0];
        if (this.image) {
            this.imgToUploadForm.append('file', this.image);
        }
        console.log(event.target.files[0]);
    }

    submitEventForm() {
        this.imgUploadService.uploadImg(this.imgToUploadForm).subscribe({
            next: (response: any) => {
                console.log(response), (this.fileName = response.fileName);
            },
            error: (error) => console.log(error)
        });
    }

    sendEvent() {
        const eventToSend = {
            name: this.createEventForm.controls['name'].value,
            // startDate: this.createEventForm.controls['startDate'].value,
            // endDate: this.createEventForm.controls['endDate'].value,
            category: this.createEventForm.controls['category'].value,
            location: {
                lat: this.createEventForm.controls['location'].value.lat,
                long: this.createEventForm.controls['location'].value.long
            },
            ticket: this.createEventForm.controls['ticket'].value,
            price: this.createEventForm.controls['price'],
            image: this.fileName
        };

        console.log(eventToSend);

        this.eventsService.createEvent(eventToSend).subscribe({
            next: (res) => {
                console.log(res), this._router.navigate(['/events/get']);
            },
            error: (err) => console.log(err)
        });
    }

    ngOnInit(): void {}
}
