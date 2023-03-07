import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/locations/review.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    constructor(private http: HttpClient) {}

    createReview(review: Review, id: string) {
        return this.http.post(environment.baseURL + `/locations/${id}/reviews`, review, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    deleteReview(id: string, reviewId: string) {
        return this.http.delete(environment.baseURL + `/locations/${id}/reviews/${reviewId}`, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
}
