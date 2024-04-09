import { AppDataSource } from '../data-source'
import { Image } from '../entities/Image'

export const imageRepository = AppDataSource.getRepository(Image)