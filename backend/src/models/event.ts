import mongoose, { Document, Schema } from 'mongoose';

enum category {
    theater = 'theater',
    festival = 'festival',
    show = 'show',
    sports = 'sports'
}

export interface IEvent {
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
    creator: {
        type: Schema.Types.ObjectId;
        ref: 'User';
    };
}

export interface IEventSchema extends IEvent, Document {}

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['theater', 'festival', 'show', 'sports'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    ticket: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    ticketsLink: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model<IEventSchema>('Event', EventSchema);
