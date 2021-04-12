import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import validator from 'validator';

import UserModel from '../models/UserModel';

class UserController {
  async all(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);

    const users = await userRepository.find();

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);
    const { username, password } = req.body;

    const userExists = await userRepository.findOne({ where: { username } });

    if (userExists) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const user = userRepository.create({ username, password });
    await userRepository.save(user);

    delete user.password;

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);
    const { id } = req.params;
    const { username, password } = req.body;

    const validId = validator.isUUID(id);

    if (!validId) {
      return res.status(400).json({ error: 'Invalid id.' });
    }

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.password = password;
    await userRepository.update(id, { username });

    return res.status(204).json(user);
  }

  async delete(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);
    const { id } = req.params;

    const validId = validator.isUUID(id);

    if (!validId) {
      return res.status(400).json({ error: 'Invalid id.' });
    }

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    await userRepository.remove(user);

    return res.status(204).json();
  }
}

export default new UserController();
