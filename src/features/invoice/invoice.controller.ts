import {Request, Response} from "express";
import CreateInvoiceUseCase from "./create-invoice/create-invoice.use-case";
import ValidateInvoiceUseCase from "./validate-invoice/validate-invoice.use-case";
import DeleteInvoiceUseCase from "./delete-invoice/delete-invoice.use-case";
import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";
import CancelInvoiceUseCase from "./cancel-invoice/cancel-invoice.use-case";
import PayInvoiceUseCase from "./pay-invoice/pay-invoice.use-case";
import InvoiceTypeOrmRepository from "./invoice.type-orm-repository";
const express = require("express");
const router = express.Router();


router.post('/', async (req: Request, res: Response) => {

    const price = req.body.price;

    const invoiceRepositoryTypeOrm = new InvoiceTypeOrmRepository();
    const createInvoiceUseCase = new CreateInvoiceUseCase(invoiceRepositoryTypeOrm);

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

    const invoiceRepositoryTypeOrm = new InvoiceTypeOrmRepository();
    const validateInvoiceUseCase = new ValidateInvoiceUseCase(invoiceRepositoryTypeOrm);

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

    const invoiceRepositoryTypeOrm = new InvoiceTypeOrmRepository();
    const deleteInvoiceUseCase = new DeleteInvoiceUseCase(invoiceRepositoryTypeOrm);

    try {
        await deleteInvoiceUseCase.deleteInvoice(invoiceId);
        return res.status(204).send();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }

});


router.put('/:id/cancel', async (req: Request, res: Response) => {

    const invoiceId = Number(req.params.id);

    const invoiceRepositoryTypeOrm = new InvoiceTypeOrmRepository();
    const cancelInvoiceUseCase = new CancelInvoiceUseCase(invoiceRepositoryTypeOrm);

    try {
        const invoice = await cancelInvoiceUseCase.cancelInvoice(invoiceId);
        return res.status(201).json(invoice);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }
});

router.put('/:id/pay', async (req: Request, res: Response) => {

    const invoiceId = Number(req.params.id);

    const invoiceRepositoryTypeOrm = new InvoiceTypeOrmRepository();
    const payInvoiceUseCase = new PayInvoiceUseCase(invoiceRepositoryTypeOrm);

    try {
        const invoice = await payInvoiceUseCase.payInvoice(invoiceId);
        return res.status(201).json(invoice);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An error occurred";
        return res.status(400).json({message});
    }
});


module.exports = router;