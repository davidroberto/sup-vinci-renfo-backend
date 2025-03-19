import {Request, Response} from "express";
import typeOrmDataSource from "../../config/db.config";
import {List} from "./list.entity";
const express = require("express");
const router = express.Router();

const listRepository = typeOrmDataSource.getRepository<List>(List);

router.get('/', async (req: Request, res: Response) => {

    try {
        const lists = await listRepository.find();
        res.send(lists);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }

});

router.post('/', async (req: Request, res: Response) => {
    try {
        const results = listRepository.create({
            createdAt: new Date(),
            name: req.body.name
        })
        res.status(200).json(results);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await listRepository.delete(req.params.id);
        res.sendStatus(200);
    } catch (e: unknown) {
        console.log(e)
        res.sendStatus(500);
    }
});

module.exports = router;