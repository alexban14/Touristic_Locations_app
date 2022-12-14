import mongoose, { Document, Schema } from 'mongoose';

export interface ILoc {
    name: string;
    description: string;
    location: {
        lat: string;
        long: string;
    };
    ticket: boolean;
    price?: number;
    images: string[];
    reviews: {
        type: Schema.Types.ObjectId;
        ref: 'Review';
    };
    creator: {
        type: Schema.Types.ObjectId;
        ref: 'User';
    };
}

export interface ILocSchema extends ILoc, Document {}

const LocSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: String,
            required: true
        },
        long: {
            type: String,
            required: true
        }
    },
    ticket: {
        type: Boolean,
        required: true
    },
    price: Number,
    images: [
        {
            type: String,
            required: true
        }
    ],
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: 'User'
    }
});

export default mongoose.model<ILocSchema>('Location', LocSchema);
