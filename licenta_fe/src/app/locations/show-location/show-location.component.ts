import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { ReviewsService } from 'src/app/services/locations/reviews.service';
import { Location, LocWrapper } from '../location.model';

@Component({
    selector: 'app-show-location',
    templateUrl: './show-location.component.html',
    styleUrls: ['./show-location.component.css']
})
export class ShowLocationComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    locationObj?: any;

    id = this.route.snapshot.paramMap.get('id');

    reviewForm: FormGroup;

    constructor(private fb: FormBuilder, private locationsService: LocationsService, private reviewsService: ReviewsService, private route: ActivatedRoute, private _router: Router) {
        this.reviewForm = this.fb.group({
            description: ['', [Validators.required, Validators.minLength(5)]],
            rating: [Number, [Validators.required, Validators.min(1), Validators.max(5)]]
        });

        this.reviewForm.valueChanges.subscribe(console.log);
    }

    ngOnInit(): void {
        let locationWrapperObs;
        if (typeof this.id === 'string') {
            locationWrapperObs = this.locationsService.getOneLocation(this.id);
        }

        this.subscription = locationWrapperObs?.subscribe((response) => ((this.locationObj = response), console.log(response)));
    }

    locationDelete() {
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
    }
}
