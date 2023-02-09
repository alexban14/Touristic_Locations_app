import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit, OnDestroy {
    logedStatus!: Subscription;
    isLogedIn!: boolean;

    constructor(private dataStorage: DataStorageService) {}

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
}
