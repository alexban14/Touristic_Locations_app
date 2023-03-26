import { Request, Response } from 'express';
import Logging from '../library/Logging';
import Event from '../models/event';

const index = async (req: Request, res: Response) => {
    try {
        const { eventsLimit = 12, page = 1 }: any = req.query;
        const events = await Event.find({})
            .limit(eventsLimit)
            .skip((page - 1) * eventsLimit)
            .populate('creator');
        Logging.info(events);
        const eventsCount = await Event.countDocuments();
        res.status(200).json({ events, totalPages: Math.ceil(eventsCount / eventsLimit), currentPage: page });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showFromStartDate = async (req: Request, res: Response) => {
    try {
        const { startDate, eventsLimit = 12, page = 1 }: any = req.query;
        if (!startDate) {
            res.status(404).json({ message: 'Start date parameter missing from the request' });
        }
        const events = await Event.find({ startDate: { $gte: startDate } })
            .limit(eventsLimit)
            .skip((page - 1) * eventsLimit)
            .populate('creator');
        Logging.info(events);
        const eventsCount = await Event.countDocuments();
        if (events) {
            res.status(200).json({ events, totalPages: Math.ceil(eventsCount / eventsLimit), currentPage: page });
        } else {
            res.status(404).json({ message: 'No events found starting with this date' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showFromStartEnd = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, eventsLimit = 12, page = 1 }: any = req.query;
        if (!startDate || !endDate) {
            res.status(404).json({ message: 'Start date or end date parameter missing from the request' });
        }
        const events = await Event.find({ startDate: { $gte: startDate, $lte: endDate } })
            .limit(eventsLimit)
            .skip((page - 1) * eventsLimit)
            .populate('creator');
        Logging.info(events);
        const eventsCount = await Event.countDocuments();
        if (events) {
            res.status(200).json({ events, totalPages: Math.ceil(eventsCount / eventsLimit), currentPage: page });
        } else {
            res.status(404).json({ message: 'No events found starting with this date' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showByCategory = async (req: Request, res: Response) => {
    try {
        const { category, eventsLimit = 12, page = 1 }: any = req.query;
        if (!category) {
            res.status(404).json({ message: 'Category parameter missing from the request' });
        }
        const events = await Event.find({ category: category })
            .limit(eventsLimit)
            .skip((page - 1) * eventsLimit)
            .populate('creator');
        Logging.info(events);
        const eventsCount = await Event.countDocuments();
        if (events) {
            res.status(200).json({ events, totalPages: Math.ceil(eventsCount / eventsLimit), currentPage: page });
        } else {
            res.status(404).json({ message: 'No events found for the specified category' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createEvent = async (req: Request, res: Response) => {
    try {
        const event = new Event(req.body);
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
        const event = await Event.findById(id).populate('creator');
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
        const updatedEvent = await Event.findByIdAndUpdate(id, { ...editedEvent });
        if (!updatedEvent) {
            res.status(404).json({ message: 'Event not found' });
        }
        res.status(201).json({ updatedEvent });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Event.findByIdAndDelete(id);
        const deletedEvent = await Event.findById(id);
        if (deletedEvent) {
            res.status(404).json({ message: 'Could not delete the event, because it was not found' });
        }
        res.status(201).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { index, showFromStartDate, showFromStartEnd, showByCategory, createEvent, showEvent, editEvent, deleteEvent };
