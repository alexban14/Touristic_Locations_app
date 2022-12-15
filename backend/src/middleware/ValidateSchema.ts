import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ILocSchema } from '../models/location';
import Logging from '../library/Logging';

export const validateLocation = (schema: ObjectSchema) => {
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

export const Schemas = {
    location: Joi.object<ILocSchema>({
        name: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.object({
            lat: Joi.string().required(),
            long: Joi.string().required()
        }).required(),
        ticket: Joi.boolean().required(),
        price: Joi.number(),
        images: Joi.array().items(Joi.string()).required()
    }).required()
};
