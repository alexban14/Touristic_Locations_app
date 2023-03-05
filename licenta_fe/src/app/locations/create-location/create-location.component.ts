import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImgUploadService } from 'src/app/services/locations/img-upload.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { LocationSend } from '../location.model';

@Component({
    selector: 'app-create-location',
    templateUrl: './create-location.component.html',
    styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent {
    createLocationForm: FormGroup;
    images: any;
    imgToUploadForm: FormData = new FormData();
    fileNames: string[] = [];

    constructor(private imgUploadService: ImgUploadService, private locationsService: LocationsService, private _router: Router) {
        this.createLocationForm = new FormGroup({
            name: new FormControl('', [Validators.minLength(4), Validators.maxLength(40), Validators.required]),
            description: new FormControl('', [Validators.minLength(100), Validators.maxLength(20000), Validators.minLength(4), Validators.required]),
            location: new FormGroup({
                lat: new FormControl('', [Validators.required]),
                long: new FormControl('', [Validators.required])
            }),
            ticket: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(1000)])
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
        const locationToSend: LocationSend = {
            name: this.createLocationForm.controls['name'].value,
            description: this.createLocationForm.controls['description'].value,
            location: {
                lat: this.createLocationForm.controls['location'].value.lat,
                long: this.createLocationForm.controls['location'].value.long
            },
            ticket: this.createLocationForm.controls['ticket'].value, // === 'true' ? true : false,
            images: this.fileNames,
            price: this.createLocationForm.controls['price'].value ? this.createLocationForm.controls['price'].value : 1
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

// this.locationToSend.name = this.createLocationForm.controls['name'].value;
// this.locationToSend.name = this.createLocationForm.controls['description'].value;
// this.locationToSend.location.lat = this.createLocationForm.controls['location'].value.lat;
// this.locationToSend.location.long = this.createLocationForm.controls['location'].value.long;
// this.locationToSend.ticket = this.createLocationForm.controls['description'].value;
// this.locationToSend.images = this.fileNames;
