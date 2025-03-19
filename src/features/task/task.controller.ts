import {Request, Response} from "express";
import typeOrmDataSource from "../../config/db.config";
import {Task} from "./task.entity";
const express = require("express");
const router = express.Router();

const taskRepository = typeOrmDataSource.getRepository<Task>(Task);

router.post('/', async (req: Request, res: Response) => {
    try {
        const task = taskRepository.create({
            list: req.body.list,
            label: req.body.label,
            isDone: false,
            createdAt: new Date()
        });
        const result = await taskRepository.save(task);
        res.status(200).json(result);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }
});

router.patch('/done/:id', async(req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);

    const task = await taskRepository.findOneBy({id: taskId});

    if (task === null) {
        res.sendStatus(404);
    }

    task.isDone = req.body.done;

    try {
        const result = await taskRepository.save(task);
        res.status(200).json(result);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }

});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await taskRepository.delete(req.params.id);
        res.sendStatus(200);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }
});

module.exports = router;