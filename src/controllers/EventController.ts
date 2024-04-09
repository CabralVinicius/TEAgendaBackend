import { Request, Response } from 'express';
import { eventRepository } from '../repositories/eventsRepositories';

export class EventController {
    async create(req: Request, res: Response) {
        const { keyWord, date, userId } = req.body;

        if (!keyWord || !date || !userId) {
            return res.status(400).json({ message: 'Keyword, date, and user ID are mandatory' });
        }

        try {
            const newEvent = eventRepository.create({ keyWord, date, user: { userId } });
            await eventRepository.save(newEvent);
            return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const event = await eventRepository.findOneBy({ date_id: parseInt(id) });
            if (event) {
                return res.json(event);
            } else {
                return res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching event' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { keyWord, date, userId } = req.body;

        try {
            const event = await eventRepository.findOneBy({ date_id: parseInt(id) });
            if (event) {
                eventRepository.merge(event, { keyWord, date, user: { userId } });
                const updatedEvent = await eventRepository.save(event);
                return res.json(updatedEvent);
            } else {
                return res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating event' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const event = await eventRepository.findOneBy({ date_id: parseInt(id) });
            if (event) {
                await eventRepository.remove(event);
                return res.status(204).json({ message: 'Event deleted' });
            } else {
                return res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting event' });
        }
    }

    async getExternalVideos(req: Request, res: Response) {
        // Request do YouTube aqui 
    }

    async getExternalImages(req: Request, res: Response) {
        // Request do GPT aqui 
    }
}
