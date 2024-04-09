import { Request, Response } from 'express';
import { videoRepository } from '../repositories/videoRepositories';

export class VideoController {
    async create(req: Request, res: Response) {
        const { title, url, eventId } = req.body;

        if (!title || !url || !eventId) {
            return res.status(400).json({ message: 'Title, URL, and event ID are mandatory' });
        }

        try {
            const newVideo = videoRepository.create({ 
                title, 
                url, 
                event: { date_id: eventId }
            });

            await videoRepository.save(newVideo);

            return res.status(201).json(newVideo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error'});
        }
    }

    async listByEvent(req: Request, res: Response) {
        const { eventId } = req.params;

        try {
            const videos = await videoRepository.find({ 
                where: { 
                    event: { date_id: parseInt(eventId) }
                }
            });

            if (videos.length > 0) {
                return res.json(videos);
            } else {
                return res.status(404).json({ message: 'No videos found for this event' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching videos' });
        }
    }
}
