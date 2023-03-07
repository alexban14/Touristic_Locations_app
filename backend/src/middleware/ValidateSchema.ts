import Joi, { ObjectSchema } from 'joi';
import('@joi/date');
const JoiDate = Joi.extend(require('@joi/date'));

import { Request, Response, NextFunction } from 'express';
import { ILocSchema } from '../models/location';
import { IReviewSchema } from '../models/review';
import { IEventSchema } from '../models/event';
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
    creationDate: Joi.number().required(),
    description: Joi.string().required(),
    location: Joi.object({
        lat: Joi.number().min(4).required(),
        long: Joi.number().min(4).required()
    }).required(),
    ticket: Joi.string().required(),
    price: Joi.number().min(1),
    images: Joi.array().items(Joi.string()).required()
}).required();

export const eventSchema = Joi.object<IEventSchema>({
    name: Joi.string().required(),
    creationDate: Joi.number().required(),
    startDate: Joi.number().required(),
    endDate: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
        lat: Joi.number().min(4).required(),
        long: Joi.number().min(4).required()
    }).required(),
    ticket: Joi.string().required(),
    price: Joi.number().min(1),
    ticketsLink: Joi.string(),
    image: Joi.string().required()
}).required();

export const reviewSchema = Joi.object<IReviewSchema>({
    creationDate: Joi.number().required(),
    description: Joi.string().required(),
    rating: Joi.number().min(1).required()
}).required();
