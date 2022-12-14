import mongoose, { Document, Schema } from 'mongoose';

export interface IReview {
    body: string;
    rating: number;
    author: {
        type: Schema.Types.ObjectId;
        ref: 'User';
    };
    location: {
        type: Schema.Types.ObjectId;
        required: 'Location';
    };
}

export interface IReviewSchema extends IReview, Document {}

const ReviewSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        type: Schema.Types.ObjectId,
        required: 'Location'
    }
});

export default mongoose.model<IReviewSchema>('Review', ReviewSchema);
