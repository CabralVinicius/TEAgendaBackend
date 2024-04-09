import { Request, Response } from 'express'
import { eventRepository } from '../repositories/eventsRepositories'
import { Any } from 'typeorm'
import { userRepository } from '../repositories/userRepositories'

export class UserController {
	async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const newUser = userRepository.create({ name, email, password });
        await userRepository.save(newUser);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}
}