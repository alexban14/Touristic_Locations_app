import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { LocationSend } from '../location.model';

@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {
    createLocationForm: FormGroup;

    constructor(private fb: FormBuilder, private locationsService: LocationsService, private _router: Router) {
        this.createLocationForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: this.fb.group({
                lat: ['', Validators.required],
                long: ['', Validators.required]
            }),
            ticket: [Boolean, Validators.required],
            price: [Number, Validators.required],
            images: [[], Validators.required]
        });

        this.createLocationForm.valueChanges.subscribe(console.log);
    }

    submitLocationForm() {
        // const locationToSend = this.createLocationForm.value;
        const locationToSend = {
            name: this.createLocationForm.controls['name'].value,
            description: this.createLocationForm.controls['description'].value,
            location: {
                lat: this.createLocationForm.controls['location'].value.lat,
                long: this.createLocationForm.controls['location'].value.long
            },
            ticket: this.createLocationForm.controls['ticket'].value === 'true' ? true : false,
            price: this.createLocationForm.controls['price'].value,
            images: [this.createLocationForm.controls['images'].value]
        };

        console.log(locationToSend);

        this.locationsService.createLocation(locationToSend).subscribe({
            next: (res: any) => {
                console.log(res);
                this._router.navigate(['/locations/get']);
            },
            error: (err: any) => console.log(err)
        });
    }

    ngOnInit(): void {}
}
