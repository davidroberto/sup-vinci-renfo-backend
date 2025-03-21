import typeOrmDataSource from "../../../config/db.config";
import {Invoice} from "../invoice.entity";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

export default class ValidateInvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepositoryInterface) {}

    public async validateInvoice(invoiceId: number): Promise<Invoice> {

        const invoice = await this.invoiceRepository.findOneBy({id: invoiceId});

        invoice.validate();

        return await this.invoiceRepository.save(invoice);
    }

}


