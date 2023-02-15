import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { EventsService } from 'src/app/services/eventsPage/events.service';
import { EventWrapper } from '../../event.model';

@Component({
    selector: 'app-select-dates',
    templateUrl: './select-dates.component.html',
    styleUrls: ['./select-dates.component.css']
})
export class SelectDatesComponent implements OnInit, OnDestroy {
    startDateForm: FormGroup;
    startEndForm: FormGroup;
    categoryForm: FormGroup;

    logedStatus!: Subscription;
    isLogedIn!: boolean;

    constructor(private dataStorage: DataStorageService, private eventService: EventsService) {
        this.startDateForm = new FormGroup({
            startDate: new FormControl('', [Validators.required])
        });

        this.startEndForm = new FormGroup({
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])
        });

        this.categoryForm = new FormGroup({
            category: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        this.logedStatus = this.dataStorage.currentLogedIn.subscribe({
            next: (response: boolean) => {
                this.isLogedIn = response;
            },
            error: (err) => console.log(err)
        });
    }

    ngOnDestroy(): void {
        this.logedStatus.unsubscribe();
    }

    submitStartForm() {
        const startDate = new Date(this.startDateForm.controls['startDate'].value);
        const startDateToSend = startDate.getTime();
        console.log(startDate);

        this.eventService.eventsByStartDate(startDateToSend).subscribe({
            next: (response: EventWrapper) => {
                this.dataStorage.changeEvents(response), this.startDateForm.reset();
            },
            error: (err) => console.log(err)
        });
    }

    submitStartEndForm() {
        const startDate = new Date(this.startEndForm.controls['startDate'].value);
        const endDate = new Date(this.startEndForm.controls['endDate'].value);

        const startDateToSend = startDate.getTime();
        const endDateToSend = endDate.getTime();

        this.eventService.eventsByStartEnd(startDateToSend, endDateToSend).subscribe({
            next: (response: EventWrapper) => {
                this.dataStorage.changeEvents(response), this.startEndForm.reset();
            },
            error: (err) => console.log(err)
        });
    }

    submitCategoryForm() {
        const category = this.categoryForm.controls['category'].value;

        this.eventService.eventsByCategory(category).subscribe({
            next: (response: EventWrapper) => {
                this.dataStorage.changeEvents(response);
            }
        });
    }
}
