import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations/locations.service';

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
            images: ['', Validators.required]
        });

        this.createLocationForm.valueChanges.subscribe(console.log);
    }

    submitLocationForm() {
        const LocationValue = this.createLocationForm.value;
        console.log(LocationValue);
        this.locationsService.createLocation(LocationValue).subscribe({
            next: (res: any) => {
                console.log(res);
                this._router.navigate(['/locations/get']);
            },
            error: (err: any) => console.log(err)
        });
    }

    ngOnInit(): void {}
}
