import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImgUploadService } from 'src/app/services/locations/img-upload.service';
import { LocationsService } from 'src/app/services/locations/locations.service';

@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent {
    createLocationForm: FormGroup;
    images: any;
    formDataToSend: FormData = new FormData();
    imgToUploadForm: FormData = new FormData();
    fileNames: string[] = [];

    constructor(private fb: FormBuilder, private imgUploadService: ImgUploadService, private locationsService: LocationsService, private _router: Router) {
        this.createLocationForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: this.fb.group({
                lat: [Number, Validators.required],
                long: [Number, Validators.required]
            }),
            ticket: [Boolean, Validators.required],
            price: [Number, Validators.required]
        });

        this.createLocationForm.valueChanges.subscribe(console.log);
    }

    onFileSelected(event: any) {
        this.images = event.target.files[0];
        if (this.images) {
            this.imgToUploadForm.append('file', this.images);
        }
        console.log(event.target.files[0]);
    }

    submitLocationForm() {
        this.imgUploadService.uploadImg(this.imgToUploadForm).subscribe({
            next: (res: any) => {
                this.fileNames.push(res.fileName), console.log('image upload API response: ', res, 'filename: ', this.fileNames), this.sendLocation();
            },
            error: (err) => console.log(err)
        });
    }

    sendLocation() {
        const locationToSend = {
            name: this.createLocationForm.controls['name'].value,
            description: this.createLocationForm.controls['description'].value,
            location: {
                lat: this.createLocationForm.controls['location'].value.lat,
                long: this.createLocationForm.controls['location'].value.long
            },
            ticket: this.createLocationForm.controls['ticket'].value, // === 'true' ? true : false,
            price: this.createLocationForm.controls['price'].value,
            images: this.fileNames
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
}
