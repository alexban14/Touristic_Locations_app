import { Request, Response } from 'express';
import Logging from '../library/Logging';
import Location from '../models/location';

const index = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find({});
        console.log(locations);
        res.status(200).json({ locations });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createLocation = async (req: Request, res: Response) => {
    try {
        const location = new Location(req.body);
        location.creator = req.user?._id;
        await location.save();
        res.status(201).json({ location });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const location = await Location.findById(id).populate('reviews').populate('creator');
        Logging.info(location);
        location ? res.status(200).json({ location }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedLocation = await Location.findByIdAndUpdate(id, { ...req.body });
        updatedLocation ? res.status(201).json({ updatedLocation }) : res.status(400).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Location.findByIdAndDelete(id);
        const deletedLocation = await Location.findById(id);
        !deletedLocation ? res.status(201).json({ message: 'Location Deleted' }) : res.status(404).json({ message: 'Location not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { index, createLocation, showLocation, updateLocation, deleteLocation };
