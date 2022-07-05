import { Router } from 'express';
import TasksController from '../controllers/tasksController';
import TasksModel from '../models/tasksModel';
import TasksService from '../services/tasksService';
import connection from '../models/connection';

const tasksRoute = Router();
const db = connection;
const model = new TasksModel(db);
const service = new TasksService(model);
const controller = new TasksController(service);

tasksRoute.get('/today', (req, res, next) => controller.findTasksToday(req, res, next))
  .get('/tomorrow', (req, res, next) => controller.findTasksTomorrow(req, res, next))
  .post('/today', (req, res, next) => controller.create(req, res, next))
  .put('/today', (req, res, next) => controller.update(req, res, next))
  .delete('/today', (req, res, next) => controller.delete(req, res, next));

export default tasksRoute;
