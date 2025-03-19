import {Request, Response} from "express";
import CreateInvoiceUseCase from "./create-invoice.use-case";
const express = require("express");
const router = express.Router();


router.post('/', async (req: Request, res: Response) => {

    const price = req.body.price;

    const createInvoiceUseCase = new CreateInvoiceUseCase();
    const invoice = await createInvoiceUseCase.createInvoice({price});


    return res.status(201).json(invoice);
});

module.exports = router;