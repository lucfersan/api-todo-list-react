import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import validator from 'validator';

import TodoModel from '../models/TodoModel';
import UserModel from '../models/UserModel';

class TodoController {
  async all(req: Request, res: Response) {
    const { userId } = req.params;
    const todoRepository = getRepository(TodoModel);

    const todos = await todoRepository.find({ where: { user_id: userId } });

    return res.json(todos);
  }

  async store(req: Request, res: Response) {
    const todoRepository = getRepository(TodoModel);
    const { user_id, name } = req.body;

    const userRepository = getRepository(UserModel);
    const userExists = await userRepository.findOne({ where: { id: user_id } });

    if (!userExists) {
      return res.status(409).json({ error: 'User does not exist.' });
    }

    const todo = todoRepository.create({ user_id, name, done: false });
    await todoRepository.save(todo);

    return res.json(todo);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const validId = validator.isUUID(id);
    if (!validId) {
      return res.status(400).json({ error: 'Invalid id.' });
    }

    const todoRepository = getRepository(TodoModel);

    const todo = await todoRepository.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    await todoRepository.update(id, { name });

    return res.status(204).json();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const validId = validator.isUUID(id);
    if (!validId) {
      return res.status(400).json({ error: 'Invalid id.' });
    }

    const todoRepository = getRepository(TodoModel);

    const todo = await todoRepository.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    await todoRepository.remove(todo);

    return res.status(204).json();
  }

  async toggleDone(req: Request, res: Response) {
    const { id } = req.params;

    const validId = validator.isUUID(id);
    if (!validId) {
      return res.status(400).json({ error: 'Invalid id.' });
    }

    const todoRepository = getRepository(TodoModel);

    const todo = await todoRepository.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    const toggleDone = todo.done ? false : true;

    await todoRepository.update(id, { done: toggleDone });

    return res.status(204).json();
  }
}

export default new TodoController();
