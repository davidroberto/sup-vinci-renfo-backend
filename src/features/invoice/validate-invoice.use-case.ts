import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

export default class ValidateInvoiceUseCase {

    public async validateInvoice(invoiceId: number): Promise<Invoice> {
        const invoiceRepository = typeOrmDataSource.getRepository<Invoice>(Invoice);

        const invoice = await invoiceRepository.findOneBy({id: invoiceId});

        invoice.validate();

        return await invoiceRepository.save(invoice);
    }

}


