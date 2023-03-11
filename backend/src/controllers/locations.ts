import { Request, Response } from 'express';
import Logging from '../library/Logging';
import Location from '../models/location';

const index = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find({}).sort({ creationDate: -1 });
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
        console.log(location);
        res.status(201).json({ location });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const showLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const location = await Location.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('creator');
        Logging.info(location);
        location ? res.status(200).json({ location }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const searchLocation = async (req: Request, res: Response) => {
    try {
        const locationName: string = req.query.locationName as string;
        if (!locationName) {
            res.status(422).json({ message: 'Query parameter not provided' });
        }
        const queryRegEx = new RegExp(locationName, 'i');
        const locations = await Location.find({ name: queryRegEx });
        if (!locations) {
            res.status(404).json({ message: 'No Location found matching the query parameter' });
        }
        res.status(200).json({ locations });
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

export default { index, createLocation, searchLocation, showLocation, updateLocation, deleteLocation };
