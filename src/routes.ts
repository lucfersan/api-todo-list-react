import { Router } from 'express';

import UserController from './app/controllers/UserController';
import TodoController from './app/controllers/TodoController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/authMiddleware';

const router = Router();

// USERS
router.get('/users', UserController.all);
router.post('/users', UserController.store);
router.put('/users/:id', authMiddleware, UserController.update);
router.delete('/users/:id', authMiddleware, UserController.delete);

// TODOS
router.get('/todos/:userId', TodoController.all);
router.post('/todos', TodoController.store);
router.patch('/todos/done/:id', TodoController.toggleDone);
router.patch('/todos/:id', TodoController.update);
router.delete('/todos/:id', TodoController.delete);

// SESSION
router.post('/session', SessionController.store);

export default router;
