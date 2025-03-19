import {Request, Response} from "express";
import app from '../src/config/bootstrap';

const listController = require('./features/list/list.controller');
const taskController = require('./features/task/task.controller');

app.get('/api/hello', (req: Request, res: Response)=> {
    res.send('hello');
})

app.use('/api/lists', listController);
app.use('/api/tasks', taskController);



