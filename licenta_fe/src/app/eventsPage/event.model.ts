enum category {
    theater = 'theater',
    music_festival = 'music_festival',
    comdey_show = 'comdey_show',
    movie_festival = 'movie_festival',
    sports = 'sports'
}

export class Event {
    name: string;
    creationDate: number;
    startDate: string;
    endDate: string;
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
        startDate: string,
        endDate: string,
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

export class EventSend {
    name: string;
    startDate: string;
    endDate: string;
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
        // creationDate: number,
        startDate: string,
        endDate: string,
        category: category,
        description: string,
        location: { lat: number; long: number },
        ticket: string,
        price: number,
        ticketsLink: string,
        image: string
    ) {
        (this.name = name), /* (this.creationDate = creationDate),*/ (this.startDate = startDate), (this.endDate = endDate), (this.category = category), (this.description = description);
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
