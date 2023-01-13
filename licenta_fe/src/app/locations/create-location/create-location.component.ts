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
    images: File | undefined;
    formDataToSend: FormData = new FormData();

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
            images: [null]
        });

        this.createLocationForm.valueChanges.subscribe(console.log);
    }

    submitLocationForm() {
        this.formDataToSend.append('name', this.createLocationForm.controls['name'].value);
        this.formDataToSend.append('description', this.createLocationForm.controls['description'].value);
        this.formDataToSend.append('location.lat', this.createLocationForm.controls['location'].value.lat);
        this.formDataToSend.append('location.long', this.createLocationForm.controls['location'].value.long);
        this.formDataToSend.append('ticket', this.createLocationForm.controls['ticket'].value);
        this.formDataToSend.append('price', this.createLocationForm.controls['price'].value);
        this.formDataToSend.append('files', this.createLocationForm.controls['images'].value);

        console.log(this.formDataToSend, this.createLocationForm.controls['images'].value);

        this.locationsService.createLocation(this.formDataToSend).subscribe({
            next: (res: any) => {
                console.log(res);
                this._router.navigate(['/locations/get']);
            },
            error: (err: any) => console.log(err)
        });
    }

    ngOnInit(): void {}
}

// const locationToSend = this.createLocationForm.value;
// const locationToSend = {
//     name: this.createLocationForm.controls['name'].value,
//     description: this.createLocationForm.controls['description'].value,
//     location: {
//         lat: this.createLocationForm.controls['location'].value.lat,
//         long: this.createLocationForm.controls['location'].value.long
//     },
//     ticket: this.createLocationForm.controls['ticket'].value === 'true' ? true : false,
//     price: this.createLocationForm.controls['price'].value,
//     file: this.createLocationForm.controls['images'].value
// };

// onFileSelected(event: any) {
//     this.images = event.target.files[0];
//     if (this.images) {
//         this.formDataToSend.append('images', this.images);
//     }
// }
