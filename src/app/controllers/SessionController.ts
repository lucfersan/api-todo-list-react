import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel';

class SessionController {
  async store(req: Request, res: Response) {
    const userRepository = getRepository(UserModel);
    const { username, password } = req.body;

    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    delete user.password;

    return res.json({
      user,
      token,
    });
  }
}

export default new SessionController();
