export class Review {
    public description: string;
    public rating: number;

    constructor(description: string, rating: number) {
        (this.description = description), (this.rating = rating);
    }
}

export class ReviewWrapper {
    public review: Review;

    constructor(review: Review) {
        this.review = review;
    }
}
