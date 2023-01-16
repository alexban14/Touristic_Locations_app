import mongoose, { Document, Schema } from 'mongoose';
import Logging from '../library/Logging';
import Review from './review';

export interface ILoc {
    name: string;
    description: string;
    location: {
        lat: string;
        long: string;
    };
    ticket: string;
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
        type: String,
        required: true
    },
    price: Number,
    images: [
        {
            type: String,
            required: true
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// middleware that deletes all reviews related to a location
LocSchema.post('findOneAndDelete', async function (doc) {
    Logging.info(doc);
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

export default mongoose.model<ILocSchema>('Location', LocSchema);
