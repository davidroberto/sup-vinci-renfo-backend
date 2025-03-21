import InvoiceRepositoryInterface from "./invoice.repository.interface";
import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";
import {Repository} from "typeorm";

export default class InvoiceTypeOrmRepository implements InvoiceRepositoryInterface {

    private readonly invoiceRepositoryTypeOrmBase: Repository<Invoice>;

    constructor() {
        const invoiceRepositoryTypeOrmBase = typeOrmDataSource.getRepository<Invoice>(Invoice);
    }

    async findOneBy({id}: {id: number}): Promise<Invoice> {
        return this.invoiceRepositoryTypeOrmBase.findOneBy({id});
    }

    async save(invoice: Invoice): Promise<Invoice> {
        return this.invoiceRepositoryTypeOrmBase.save(invoice);
    }

    async delete(invoiceId: number): Promise<void> {
        await this.invoiceRepositoryTypeOrmBase.delete(invoiceId);
    }

}