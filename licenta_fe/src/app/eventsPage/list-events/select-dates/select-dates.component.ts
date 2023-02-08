import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { EventsService } from 'src/app/services/eventsPage/events.service';

@Component({
    selector: 'app-select-dates',
    templateUrl: './select-dates.component.html',
    styleUrls: ['./select-dates.component.css']
})
export class SelectDatesComponent implements OnInit {
    startDateForm: FormGroup;
    startEndForm: FormGroup;
    categoryFrom: FormGroup;

    constructor(private dataStorage: DataStorageService, private eventService: EventsService) {
        this.startDateForm = new FormGroup({
            startDate: new FormControl('', [Validators.required])
        });

        this.startEndForm = new FormGroup({
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])
        });

        this.categoryFrom = new FormGroup({
            category: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {}

    submitStartForm() {}

    submitStartEndForm() {}

    categoryForm() {}
}
