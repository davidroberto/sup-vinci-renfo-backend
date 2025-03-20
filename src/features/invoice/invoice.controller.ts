import {Request, Response} from "express";
import CreateInvoiceUseCase from "./create-invoice.use-case";
import ValidateInvoiceUseCase from "./validate-invoice.use-case";
import DeleteInvoiceUseCase from "./delete-invoice.use-case";
const express = require("express");
const router = express.Router();


router.post('/', async (req: Request, res: Response) => {

    const price = req.body.price;

    const createInvoiceUseCase = new CreateInvoiceUseCase();

    try {
        const invoice = await createInvoiceUseCase.createInvoice({price});
        return res.status(201).json(invoice);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }
});


router.put('/:id/validate', async (req: Request, res: Response) => {

    const invoiceId = Number(req.params.id);
    const validateInvoiceUseCase = new ValidateInvoiceUseCase();

    try {
        const invoice = await validateInvoiceUseCase.validateInvoice(invoiceId);
        return res.status(201).json(invoice);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }
});


router.delete('/:id', async (req: Request, res: Response) => {

    const invoiceId = Number(req.params.id);
    const deleteInvoiceUseCase = new DeleteInvoiceUseCase();

    try {
        await deleteInvoiceUseCase.deleteInvoice(invoiceId);
        return res.status(204).send();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }

});

module.exports = router;