export class Review {
    public creationDate: number;
    public description: string;
    public rating: number;

    constructor(creationDate: number, description: string, rating: number) {
        (this.creationDate = creationDate), (this.description = description), (this.rating = rating);
    }
}

export class ReviewWrapper {
    public review: Review;

    constructor(review: Review) {
        this.review = review;
    }
}
