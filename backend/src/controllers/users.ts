import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, (err: Error) => {
            if (err) return next(err);
            req.flash('success', 'Signed Up!');
        });
    } catch (e) {
        if (typeof e === 'string') {
            req.flash('error', e);
            res.redirect('/register');
        } else if (e instanceof Error) {
            req.flash('error', e.message);
        }
    }
};

const loginUser = async (req: Request, res: Response) => {
    req.flash('success', 'Welcome back!');
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out successfully');
    });
};
