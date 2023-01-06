import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Location from '../models/location';
import Review from '../models/review';

const isLogedInStatus = async (req: Request, res: Response) => {
    try {
        if (!req.isAuthenticated()) {
            res.status(200).json({ logedIn: false });
        } else {
            res.status(200).json({ logedIn: true });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const isLocationAuthorStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const location = await Location.findOne({ _id: new ObjectId(id) });
        const location = await Location.findById(id);
        const userId = req.user?._id;
        if (req.isAuthenticated() && userId.equals(location?.creator)) {
            res.status(200).json({ locationAuthor: true });
        } else {
            res.status(200).json({ locationAuthor: false });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const isReviewAuthorStatus = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        // const review = await Review.findOne({ _id: new ObjectId(reviewId) });
        const review = await Review.findById(reviewId);
        const userId = req.user?._id;
        if (userId.equals(review?.author)) {
            res.status(200).json({ reviewAuthor: true });
        } else {
            res.status(200).json({ reviewAuthor: false });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { isLogedInStatus, isLocationAuthorStatus, isReviewAuthorStatus };
