import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ILocSchema } from '../models/location';
import { IReviewSchema } from '../models/review';
import Logging from '../library/Logging';

export const validateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error: any) {
            Logging.error(error);
            res.status(422).json({ error });
        }
    };
};

export const locationSchema = Joi.object<ILocSchema>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
        lat: Joi.string().required(),
        long: Joi.string().required()
    }).required(),
    ticket: Joi.boolean().required(),
    price: Joi.number().min(1)
    // images: Joi.array().items(Joi.string()).required()
}).required();

export const reviewSchema = Joi.object({
    review: Joi.object<IReviewSchema>({
        description: Joi.string().required(),
        rating: Joi.number().min(1).required()
    }).required()
});
