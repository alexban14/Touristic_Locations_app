enum category {
    theater = 'theater',
    festival = 'festival',
    show = 'show',
    sports = 'sports'
}

export class Event {
    _id: string;
    name: string;
    creationDate: number;
    startDate: number;
    endDate: number;
    category: category;
    creator: {
        _id: string;
        email: string;
        username: string;
    };
    description: string;
    location: {
        lat: number;
        long: number;
    };
    ticket: string;
    price: number;
    ticketsLink: string;
    image: string;

    constructor(
        _id: string,
        name: string,
        creationDate: number,
        startDate: number,
        endDate: number,
        category: category,
        creator: { _id: string; email: string; username: string },
        description: string,
        location: { lat: number; long: number },
        ticket: string,
        price: number,
        ticketsLink: string,
        image: string
    ) {
        (this._id = _id),
            (this.name = name),
            (this.creationDate = creationDate),
            (this.startDate = startDate),
            (this.endDate = endDate),
            (this.category = category),
            (this.creator = creator),
            (this.description = description);
        (this.location = location), (this.ticket = ticket), (this.price = price), (this.ticketsLink = ticketsLink), (this.image = image);
    }
}

export class EventSend {
    name: string;
    creationDate: number;
    startDate: number;
    endDate: number;
    category: category;
    description: string;
    location: {
        lat: number;
        long: number;
    };
    ticket: string;
    price: number;
    ticketsLink: string;
    image: string;

    constructor(
        name: string,
        creationDate: number,
        startDate: number,
        endDate: number,
        category: category,
        description: string,
        location: { lat: number; long: number },
        ticket: string,
        price: number,
        ticketsLink: string,
        image: string
    ) {
        (this.name = name), (this.creationDate = creationDate), (this.startDate = startDate), (this.endDate = endDate), (this.category = category), (this.description = description);
        (this.location = location), (this.ticket = ticket), (this.price = price), (this.ticketsLink = ticketsLink), (this.image = image);
    }
}

export class EventWrapper {
    public events: Event[];

    constructor(events: Event[]) {
        this.events = events;
    }
}

export class OneEventWrapper {
    public event: Event;

    constructor(event: Event) {
        this.event = event;
    }
}
