"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var TodoController_1 = __importDefault(require("./app/controllers/TodoController"));
var SessionController_1 = __importDefault(require("./app/controllers/SessionController"));
var authMiddleware_1 = __importDefault(require("./app/middlewares/authMiddleware"));
var router = express_1.Router();
// USERS
router.get('/users', UserController_1.default.all);
router.post('/users', UserController_1.default.store);
router.put('/users/:id', authMiddleware_1.default, UserController_1.default.update);
router.delete('/users/:id', authMiddleware_1.default, UserController_1.default.delete);
// TODOS
router.get('/todos/:userId', TodoController_1.default.all);
router.post('/todos', TodoController_1.default.store);
router.patch('/todos/done/:id', TodoController_1.default.toggleDone);
router.patch('/todos/:id', TodoController_1.default.update);
router.delete('/todos/:id', TodoController_1.default.delete);
// SESSION
router.post('/session', SessionController_1.default.store);
exports.default = router;
