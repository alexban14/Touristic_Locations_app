import mongoose, { Document, Schema } from 'mongoose';

export interface IReview {
    description: string;
    creationDate: number;
    rating: number;
    author: {
        type: Schema.Types.ObjectId;
        ref: 'User';
    };
}

export interface IReviewSchema extends IReview, Document {}

const ReviewSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model<IReviewSchema>('Review', ReviewSchema);
