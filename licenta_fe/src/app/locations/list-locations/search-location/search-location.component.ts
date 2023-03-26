import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OneEventWrapper } from 'src/app/eventsPage/event.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { LocWrapper, OneLocWrapper } from '../../location.model';

@Component({
    selector: 'app-search-location',
    templateUrl: './search-location.component.html',
    styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {
    searchForm: FormGroup;

    constructor(private locationsService: LocationsService, private dataStorage: DataStorageService) {
        this.searchForm = new FormGroup({
            locationName: new FormControl('', [Validators.required, Validators.minLength(5)])
        });
    }

    ngOnInit(): void {}

    searchLocation() {
        const locationName = this.searchForm.controls['locationName'].value;
        this.locationsService.searchedLocation(locationName).subscribe({
            next: (response: LocWrapper) => {
                this.dataStorage.changeLocations(response);
            },
            error: (err) => console.log(err)
        });
    }
}
