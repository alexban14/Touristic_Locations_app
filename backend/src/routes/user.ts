import express from 'express';
import passport from 'passport';
import usersController from '../controllers/user';

const router = express.Router();

router.post('/register', usersController.register);
router.post(
    '/login',
    passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }),
    usersController.login
);
router.post('/logout', usersController.logout);

export = router;
