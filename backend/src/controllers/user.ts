import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import User from '../models/user';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        Logging.info(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                res.status(400).json({ err });
                next(err);
            }
            res.status(201).json({ message: 'Successfuly singed up!' });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const login = async (req: Request, res: Response) => {
    res.status(201).json({ message: 'Successfully loged in! Welcome back!' });
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            res.status(400).json({ message: "Couldn't log you out." });
            next(err);
        }
        res.status(201).json({ message: 'Successfully loged you out!' });
    });
};

export default { register, login, logout };
