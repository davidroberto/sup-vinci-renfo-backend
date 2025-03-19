import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

type CreateInvoiceDto = {
    price: number;
}

export default class CreateInvoiceUseCase {

    public async createInvoice({price}: CreateInvoiceDto): Promise<Invoice> {

        const invoiceRepository = typeOrmDataSource.getRepository<Invoice>(Invoice);

        if (price > 500) {
            throw new Error("Le prix ne peut pas être supérieur à 500");
        }

        const invoice = invoiceRepository.create({
            createdAt: new Date(),
            price: price,
            status: "PENDING"
        })

        return await invoiceRepository.save(invoice);
    }

}