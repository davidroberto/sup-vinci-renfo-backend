import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

export default class ValidateInvoiceUseCase {

    constructor(private readonly invoiceRepository: any) {}

    public async validateInvoice(invoiceId: number): Promise<Invoice> {

        const invoice = await this.invoiceRepository.findOneBy({id: invoiceId});

        invoice.validate();

        return await this.invoiceRepository.save(invoice);
    }

}


