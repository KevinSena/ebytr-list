import { Router } from 'express';
import UserModel from '../models/usersModel';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import connection from '../models/connection';

const userRoute = Router();
const db = connection;
const model = new UserModel(db);
const service = new UserService(model);
const controller = new UserController(service);

userRoute.post('/login', (req, res, next) => controller.login(req, res, next));

export default userRoute;
