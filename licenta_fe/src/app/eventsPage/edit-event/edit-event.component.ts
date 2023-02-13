import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { BackendResponseUpload, ImgUploadService } from 'src/app/services/locations/img-upload.service';
import { EventWrapper, OneEventWrapper } from '../event.model';

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
    deleteImage!: string;
    newImgFileName!: string;
    event_id = this.route.snapshot.paramMap.get('id');
    editedEvent: FormGroup;

    constructor(private eventsService: EventsService, private imgUploadService: ImgUploadService, private route: ActivatedRoute, private _router: Router) {
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
            description: new FormControl('', [Validators.minLength(100), Validators.maxLength(10000), Validators.required]),
            image: new FormControl()
        });

        this.editedEvent.valueChanges.subscribe(console.log);
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0];
        if (this.image) {
            this.imgToUploadForm.append('file', this.image);
        }
        console.log(event.target.files[0]);
    }

    ngOnInit(): void {
        if (typeof this.event_id === 'string') {
            this.eventSubscription = this.eventsService.getOneEvent(this.event_id).subscribe({
                next: (response: OneEventWrapper) => {
                    console.log(response),
                        this.editedEvent.setValue({
                            name: response.event.name,
                            startDate: response.event.startDate,
                            endDate: response.event.endDate,
                            category: response.event.category,
                            location: {
                                lat: response.event.location.lat,
                                long: response.event.location.long
                            },
                            ticket: response.event.ticket,
                            price: response.event.price,
                            ticketsLink: '',
                            description: response.event.description,
                            image: response.event.image
                        }),
                        (this.deleteImage = response.event.image);
                },
                error: (err) => console.log(err)
            });
        }
    }

    submitEditedEvent() {
        if (this.imgToUploadForm.has('file')) {
            this.imgUploadService.deleteImg(this.deleteImage).subscribe({
                next: (res) => {
                    console.log(res),
                        this.imgUploadService.uploadImg(this.imgToUploadForm).subscribe({
                            next: (res: BackendResponseUpload) => {
                                this.newImgFileName = res.fileName;
                                console.log(this.newImgFileName);
                                this.updateEvent(this.newImgFileName);
                            },
                            error: (err) => console.log(err)
                        });
                },
                error: (err) => console.log(err)
            });
        } else {
            this.updateEvent(this.editedEvent.controls['image'].value);
        }
    }

    updateEvent(imageToSend: string) {
        const dates = {
            startDate: new Date(this.editedEvent.controls['startDate'].value),
            endDate: new Date(this.editedEvent.controls['endDate'].value)
        };

        const editedEvent = {
            name: this.editedEvent.controls['name'].value,
            startDate: dates.startDate.getTime(),
            endDate: dates.endDate.getTime(),
            category: this.editedEvent.controls['category'].value,
            location: {
                lat: this.editedEvent.controls['location'].value.lat,
                long: this.editedEvent.controls['location'].value.long
            },
            ticket: this.editedEvent.controls['ticket'].value,
            price: this.editedEvent.controls['price'].value,
            image: imageToSend,
            description: this.editedEvent.controls['description'].value
        };

        console.log(editedEvent);

        if (typeof this.event_id === 'string') {
            this.eventsService.editEvent(editedEvent, this.event_id).subscribe({
                next: (res: OneEventWrapper) => console.log(res),
                error: (err: any) => console.log(err)
            });
        }

        this._router.navigate([`/events/get/${this.event_id}`]);
    }
}
