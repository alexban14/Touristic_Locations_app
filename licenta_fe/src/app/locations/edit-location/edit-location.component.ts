import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations/locations.service';

@Component({
    selector: 'app-edit-location',
    templateUrl: './edit-location.component.html',
    styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationObjToEdit?: any;
    id = this.route.snapshot.paramMap.get('id');

    editedLocationForm: FormGroup;

    constructor(private fb: FormBuilder, private locationsService: LocationsService, private _router: Router, private route: ActivatedRoute) {
        this.editedLocationForm = this.fb.group({
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

        this.editedLocationForm.valueChanges.subscribe(console.log);
    }

    ngOnInit(): void {
        let locationWrapperObs;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe((response) => {
            (this.locationObjToEdit = response),
                console.log(response),
                this.editedLocationForm.setValue({
                    name: response.location.name,
                    description: response.location.description,
                    location: {
                        lat: response.location.location.lat,
                        long: response.location.location.long
                    },
                    ticket: response.location.ticket,
                    price: response.location.price,
                    images: response.location.images
                });
        });
    }

    submitEditedLocation() {
        const editedLocation = {
            name: this.editedLocationForm.controls['name'].value,
            description: this.editedLocationForm.controls['description'].value,
            location: {
                lat: this.editedLocationForm.controls['location'].value.lat,
                long: this.editedLocationForm.controls['location'].value.long
            },
            ticket: this.editedLocationForm.controls['ticket'].value === 'true' ? true : false,
            price: this.editedLocationForm.controls['price'].value,
            images: this.editedLocationForm.controls['images'].value
        };

        console.log(editedLocation);

        if (typeof this.id === 'string') {
            this.locationsService.editLocation(editedLocation, this.id).subscribe({
                next: (res: any) => console.log(res),
                error: (err) => console.log(err)
            });
        }

        this._router.navigate([`/locations/get/${this.id}`]);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
