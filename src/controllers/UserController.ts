import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepositories';

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

    async get(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await userRepository.findOneBy({ userId: parseInt(id) });
            if (user) {
                return res.json(user);
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await userRepository.findOneBy({ userId: parseInt(id) });
            if (user) {
                userRepository.merge(user, { name, email, password });
                const updatedUser = await userRepository.save(user);
                return res.json(updatedUser);
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar usuário' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await userRepository.findOneBy({ userId: parseInt(id) });
            if (user) {
                await userRepository.remove(user);
                return res.status(204).json({ message: 'Usuário deletado' });
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar usuário' });
        }
    }
}
