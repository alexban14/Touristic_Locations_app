import { Request, Response } from 'express';
import Logging from '../library/Logging';

import Location from '../models/location';
import Review from '../models/review';

const createReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = new Review(req.body.review);
        review.author = req.user?._id;
        await review.save();
        // const newReview = await Review.findOne({ body: review.body});
        const reviewId = review.id;
        const location = await Location.updateOne({ _id: id }, { $push: { reviews: reviewId } });
        Logging.info(location);
        res.status(201).json({ message: 'Review created!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id, reviewId } = req.params;
        await Location.updateOne({ _id: id }, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.status(201).json({ message: 'Review deleted!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createReview, deleteReview };
