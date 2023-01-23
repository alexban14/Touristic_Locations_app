import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckService } from 'src/app/services/checking/check.service';
import { ImgUploadService } from 'src/app/services/locations/img-upload.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { ReviewsService } from 'src/app/services/locations/reviews.service';

@Component({
    selector: 'app-show-location',
    templateUrl: './show-location.component.html',
    styleUrls: ['./show-location.component.css']
})
export class ShowLocationComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    authorStatusSub: Subscription | undefined;
    loginStatusSub: Subscription | undefined;
    locationObj?: any;
    imgFilename: string = '';
    isAuthor: boolean | unknown;
    isLogedIn: boolean | unknown;

    id = this.route.snapshot.paramMap.get('id');

    reviewForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private locationsService: LocationsService,
        private imgUploadService: ImgUploadService,
        private checkService: CheckService,
        private reviewsService: ReviewsService,
        private route: ActivatedRoute,
        private _router: Router
    ) {
        this.reviewForm = this.fb.group({
            description: ['', [Validators.required, Validators.minLength(5)]],
            rating: [Number, [Validators.required, Validators.min(1), Validators.max(5)]]
        });

        this.reviewForm.valueChanges.subscribe(console.log);
    }

    ngOnInit(): void {
        let locationWrapperObs;
        let auhtorStatusRes;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
            auhtorStatusRes = this.checkService.isLocationAuthor(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe(
            (response) => ((this.locationObj = response), console.log(response), (this.imgFilename = response.location.images[0]), console.log(this.imgFilename))
        );
        this.authorStatusSub = auhtorStatusRes?.subscribe((response) => {
            (this.isAuthor = response.locationAuthor), console.log(response);
        });
        let loginStatusRes = this.checkService.isLogedIn();
        this.loginStatusSub = loginStatusRes.subscribe({
            next: (response) => {
                console.log(response), (this.isLogedIn = response.logedIn);
            },
            error: (error) => console.log(error)
        });
    }

    locationDelete() {
        this.imgUploadService.deleteImg(this.imgFilename).subscribe({
            next: (res) => {
                console.log(res), this.deleteLocationObj();
            },
            error: (err) => console.log(err)
        });
    }

    deleteLocationObj() {
        if (typeof this.id === 'string') {
            this.locationsService.deleteLocation(this.id).subscribe({
                next: (res: any) => console.log(res),
                error: (err) => console.log(err)
            });
        }
        this._router.navigate(['/locations/get']);
    }

    submitReview() {
        const createdReview = {
            review: this.reviewForm.value
        };
        if (typeof this.id === 'string') {
            this.reviewsService.createReview(createdReview, this.id).subscribe({
                next: (res: any) => console.log(res),
                error: (err) => console.log(err)
            });
        }
        window.location.reload();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.authorStatusSub?.unsubscribe();
        this.loginStatusSub?.unsubscribe();
    }
}
