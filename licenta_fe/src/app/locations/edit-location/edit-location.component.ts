import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImgUploadService } from 'src/app/services/locations/img-upload.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { LocationSend } from '../location.model';

@Component({
    selector: 'app-edit-location',
    templateUrl: './edit-location.component.html',
    styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationObjToEdit?: any;
    images: any;
    deleteImage: string[] = [];
    newImgFileName: string[] = [];
    imgToUploadForm: FormData = new FormData();
    id = this.route.snapshot.paramMap.get('id');

    editedLocationForm: FormGroup;

    constructor(private locationsService: LocationsService, private imgUploadService: ImgUploadService, private _router: Router, private route: ActivatedRoute) {
        this.editedLocationForm = new FormGroup({
            name: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required]),
            description: new FormControl('', [Validators.required]),
            location: new FormGroup({
                lat: new FormControl('', [Validators.required]),
                long: new FormControl('', [Validators.required])
            }),
            ticket: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(1000), Validators.required]),
            images: new FormControl()
        });

        this.editedLocationForm.valueChanges.subscribe(console.log);
    }

    onFileSelected(event: any) {
        this.images = event.target.files[0];
        if (this.images) {
            this.imgToUploadForm.append('file', this.images);
        }
        console.log(event.target.files[0]);
    }

    ngOnInit(): void {
        let locationWrapperObs;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe({
            next: (response) => {
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
                    }),
                    (this.deleteImage = response.location.images);
            },
            error: (err) => console.log(err)
        });
    }

    submitEditedLocation() {
        if (this.imgToUploadForm.has('file')) {
            this.imgUploadService.deleteImg(this.deleteImage[0]).subscribe({
                next: (res) => {
                    console.log(res),
                        this.imgUploadService.uploadImg(this.imgToUploadForm).subscribe({
                            next: (res) => {
                                this.newImgFileName.push(res.fileName);
                                console.log(res), this.updateLocation(this.newImgFileName);
                            }
                        });
                },
                error: (err) => console.log(err)
            });
        } else {
            this.updateLocation(this.editedLocationForm.controls['images'].value);
        }
    }

    updateLocation(imageToSend: string[]) {
        const editedLocation: LocationSend = {
            name: this.editedLocationForm.controls['name'].value,
            description: this.editedLocationForm.controls['description'].value,
            location: {
                lat: this.editedLocationForm.controls['location'].value.lat,
                long: this.editedLocationForm.controls['location'].value.long
            },
            ticket: this.editedLocationForm.controls['ticket'].value, //=== 'true' ? true : false,
            price: this.editedLocationForm.controls['price'].value,
            images: imageToSend
        };
        // if (typeof this.editedLocationForm.controls['images'].value == 'string') {
        //     editedLocation.images.push(this.editedLocationForm.controls['images'].value);
        // } else {
        //     editedLocation.images.push(...this.editedLocationForm.controls['images'].value);
        // }

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
