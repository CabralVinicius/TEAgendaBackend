import { AppDataSource } from '../data-source'
import { Event } from '../entities/Event'

export const eventRepository = AppDataSource.getRepository(Event)
