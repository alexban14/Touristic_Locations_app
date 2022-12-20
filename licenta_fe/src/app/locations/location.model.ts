import { Review } from '../reivews/review.model';

export class Location {
    public name: string;
    public description: string;
    public location: {
        lat: string;
        long: string;
    };
    public ticket: boolean;
    public price?: number;
    public images: string[];
    public reviews: Review[];

    constructor(name: string, description: string, location: { lat: string; long: string }, ticket: boolean, images: string[], reviews: Review[], price?: number) {
        (this.name = name), (this.description = description), (this.location = location), (this.ticket = ticket), (this.price = price), (this.images = images), (this.reviews = reviews);
    }
}
