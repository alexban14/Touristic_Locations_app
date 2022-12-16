import { NextFunction, Request, Response } from 'express';
import Location from '../models/location';

export const isLogedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'You must be signed in first!' });
    }
    next();
};

// export const isLocationAuthor = async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const location = await Location.findById(id);
//     if (!location?.creator.equals(req.user?._id)) {
//         res.status(401).json({ message: "You don't have permmision to delete this location" });
//     }
//     next();
// };
