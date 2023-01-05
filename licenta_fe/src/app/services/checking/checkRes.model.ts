export class CheckResponse {
    logedIn: boolean;

    constructor(logedIn: boolean) {
        this.logedIn = logedIn;
    }
}

export class LocationAuthorResponse {
    locationAuthor: boolean;

    constructor(locationAuthor: boolean) {
        this.locationAuthor = locationAuthor;
    }
}
