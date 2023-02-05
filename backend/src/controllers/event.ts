import { Request, Response } from 'express';
import Logging from '../library/Logging';
import Event from '../models/event';

const index = async (req: Request, res: Response) => {
    try {
        const events = await Event.find({});
        Logging.info(events);
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createEvent = async (req: Request, res: Response) => {
    try {
        const event = new Event(req.body);
        event.creationDate = Date.now();
        event.creator = req.user!.id;
        await event.save();
        Logging.info(event);
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showEvent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const event = await Event.findById(id);
        Logging.info(event);
        if (!event) {
            res.status(400).json({ message: 'Event not found' });
        }
        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const editEvent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const editedEvent = req.body;
        editedEvent.creationDate = Date.now();
        const updatedEvent = await Event.findByIdAndUpdate(id);
        if (!updatedEvent) {
            res.status(404).json({ message: 'Event not found' });
        }
        res.status(201).json({ updatedEvent });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteEvent = async (req: Request, res: Response) => {};

export default { index, createEvent, editEvent, deleteEvent };
