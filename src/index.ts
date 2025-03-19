import {Request, Response} from "express";
import app from '../src/config/bootstrap';

const invoiceController = require('./features/invoice/invoice.controller');

app.get('/api/hello', (req: Request, res: Response)=> {
    res.send('hello');
})

app.use('/api/invoices', invoiceController);
