import { Request, Response } from 'express';
import { imageRepository } from '../repositories/imageRepositories';

export class ImageController {
    async create(req: Request, res: Response) {
        const { name, keyWord, eventId } = req.body;

        if (!name || !keyWord || !eventId) {
            return res.status(400).json({ message: 'Name, keyword, and event ID are mandatory' });
        }

        try {
            const newImage = imageRepository.create({ 
                name, 
                keyWord, 
                event: { date_id: eventId }
            });

            await imageRepository.save(newImage);

            return res.status(201).json(newImage);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async listByEvent(req: Request, res: Response) {
        const { eventId } = req.params;

        try {
            const images = await imageRepository.find({ 
                where: { 
                    event: { date_id: parseInt(eventId) }
                }
            });

            if (images.length > 0) {
                return res.json(images);
            } else {
                return res.status(404).json({ message: 'No images found for this event' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching images' });
        }
    }
}
