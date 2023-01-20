import express from 'express';
import http from 'http';
const router = express();

import mongoose, { Mongoose } from 'mongoose';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { config } from './config/config';
import Logging from './library/Logging';
import User from './models/user';
import locationRoutes from './routes/location';
import userRoutes from './routes/user';
import reviewRoutes from './routes/review';
import checkAuthorRoutes from './routes/checkAuthor';
import imgFiles from './routes/uploadImg';

mongoose
    .set('strictQuery', false)
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('MONGO conection OPEN!');
        StartServer();
    })
    .catch((err) => {
        Logging.error('MONGO conection ERROR!');
        Logging.error(err);
    });

// Only start server if mongoDB is connected
const StartServer = () => {
    router.use((req, res, next) => {
        // Logging the request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        // Logging when finished
        res.on('finish', () => {
            Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    const corsOptions = {
        origin: 'http://localhost:4200',
        credentials: true
    };

    // global middlewares
    router.use(express.urlencoded({ extended: true }));
    router.use(cookieParser());
    router.use(cors(corsOptions));
    router.use(express.json());
    router.use(methodOverride('_method'));

    const sessionConfig = {
        name: 'session',
        secret: 'thisshouldbeabettersecret!',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    };

    router.use(session(sessionConfig));

    router.use(passport.initialize());
    // persisten loging sessions
    router.use(passport.session());
    passport.use(new LocalStrategy.Strategy(User.authenticate()));
    // serialize = store
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    router.use((req, res, next) => {
        Logging.info(req.session);
        // req.session.user = req.user;
        next();
    });

    // API rules
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorizaton');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // ROUTES
    router.use('/locations', locationRoutes);
    router.use('/auth', userRoutes);
    router.use('/locations/:id/reviews', reviewRoutes);
    router.use('/check', checkAuthorRoutes);
    router.use('/imgFiles', imgFiles);

    // Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // Error handeling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}.`);
    });
};
