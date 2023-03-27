import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { environment } from 'src/environments/environment';
import { Location, LocWrapper } from '../location.model';

@Component({
    selector: 'app-list-locations',
    templateUrl: './list-locations.component.html',
    styleUrls: ['./list-locations.component.css']
})
export class ListLocationsComponent implements OnInit, OnDestroy {
    serverSubscription!: Subscription;
    serviceSubscription!: Subscription;
    locationsObj!: LocWrapper;

    logedStatus!: Subscription;
    isLogedIn!: boolean;

    constructor(private locationsService: LocationsService, private dataStorage: DataStorageService) {}

    ngOnInit(): void {
        this.fetchInitialLocations();
        this.fetchLocations();
        this.getLoggedInStatus();
    }

    ngOnDestroy(): void {
        this.serverSubscription.unsubscribe();
        this.logedStatus.unsubscribe();
    }

    fetchInitialLocations() {
        const locationWrapperObs: Observable<LocWrapper> = this.locationsService.getAllLocations(1, 12);

        this.serverSubscription = locationWrapperObs.subscribe((response) => {
            this.dataStorage.changeLocations(response);
            console.log(response);
        });
    }

    fetchLocations() {
        this.serviceSubscription = this.dataStorage.currentLocations.subscribe({
            next: (response: LocWrapper) => {
                (this.locationsObj = response), console.log(this.locationsObj);
            },
            error: (err) => console.log(err)
        });
    }

    getLoggedInStatus() {
        this.logedStatus = this.dataStorage.currentLogedIn.subscribe({
            next: (response: boolean) => {
                this.isLogedIn = response;
            },
            error: (err) => console.log(err)
        });
    }

    paginateArray(numPages: number): number[] {
        return Array(numPages);
    }

    changePage(page: number) {
        this.locationsService.getAllLocations(page, 3).subscribe({
            next: (res: LocWrapper) => {
                this.dataStorage.changeLocations(res);
            },
            error: (err) => console.log(err)
        });
        console.log(page);
    }
}
