export class Review {
    public description: string;
    public rating: number;

    constructor(descrption: string, rating: number) {
        (this.description = descrption), (this.rating = rating);
    }
}
