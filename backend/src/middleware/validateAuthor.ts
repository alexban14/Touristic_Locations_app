import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Location from '../models/location';
import Review from '../models/review';

export const isLogedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You must be signed in first!' });
    } else {
        next();
    }
};

export const isLocationAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const location = await Location.findOne({ _id: new ObjectId(id) });
    const userId = req.user?._id;
    if (userId.equals(location?.creator)) {
        next();
    } else {
        res.status(401).json({ message: "You don't have permision to perform this operation!" });
    }
};

export const isReviewAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;
    const review = await Review.findOne({ _id: new ObjectId(reviewId) });
    const userId = req.user?._id;
    if (userId.equals(review?.author)) {
        next();
    } else {
        res.status(401).json({ message: "You don't have permision to delete this this!" });
    }
};
