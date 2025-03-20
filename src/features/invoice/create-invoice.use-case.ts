import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

type CreateInvoiceDto = {
    price: number;
}

export default class CreateInvoiceUseCase {

    public async createInvoice({price}: CreateInvoiceDto): Promise<Invoice> {
        const invoiceRepository = typeOrmDataSource.getRepository<Invoice>(Invoice);

        const invoice = new Invoice(price);

        return invoice;
        
        return await invoiceRepository.save(invoice);
    }


}