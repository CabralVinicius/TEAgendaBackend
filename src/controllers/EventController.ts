import { Request, Response } from 'express'
import { eventRepository } from '../repositories/eventsRepositories'

export class EventController {
    async create(req: Request, res: Response) {
        const { keyWord, date, userId } = req.body;

        if (!keyWord || !date || !userId) {
            return res.status(400).json({ message: 'Keyword, date, and user ID are mandatory' });
        }

        try {
            const newEvent = eventRepository.create({ 
                keyWord,
                date,
                user: { userId }
            });

            await eventRepository.save(newEvent);

            return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error'});
        }
    }
}
