import {Invoice} from "./invoice.entity";

export default interface InvoiceRepositoryInterface {
    findOneBy({id}: {id: number}): Promise<Invoice>;
    save(invoice: Invoice): Promise<Invoice>;
    delete(invoiceId: number): Promise<void>;
}