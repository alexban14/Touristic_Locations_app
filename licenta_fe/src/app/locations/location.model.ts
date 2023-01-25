export class Location {
    public _id: string;
    public name: string;
    public description: string;
    public location: {
        lat: number;
        long: number;
    };
    public ticket: boolean;
    public price?: number;
    public images: string[];
    public reviews: [];

    constructor(_id: string, name: string, description: string, location: { lat: number; long: number }, ticket: boolean, images: string[], reviews: [], price?: number) {
        (this._id = _id),
            (this.name = name),
            (this.description = description),
            (this.location = location),
            (this.ticket = ticket),
            (this.price = price),
            (this.images = images),
            (this.reviews = reviews);
    }
}

export class LocationSend {
    public name: string;
    public description: string;
    public location: {
        lat: number;
        long: number;
    };
    public ticket: boolean;
    public price?: number;
    public images: string[];

    constructor(name: string, description: string, location: { lat: number; long: number }, ticket: boolean, images: string[], price?: number) {
        (this.name = name), (this.description = description), (this.location = location), (this.ticket = ticket), (this.price = price), (this.images = images);
    }
}

export class LocWrapper {
    public locations: Location[];

    constructor(locations: Location[]) {
        this.locations = locations;
    }
}

export class OneLocWrapper {
    public location: Location;

    constructor(location: Location) {
        this.location = location;
    }
}
