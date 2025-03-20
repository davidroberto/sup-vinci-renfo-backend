import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

type CreateInvoiceDto = {
    price: number;
}


export default class CreateInvoiceUseCase {

    private invoiceRepository: any;

    constructor(invoiceRepository: any) {
        this.invoiceRepository = invoiceRepository;
    }

    public async createInvoice({price}: CreateInvoiceDto): Promise<Invoice> {
        const invoice = new Invoice(price);

        return await this.invoiceRepository.save(invoice);
    }


}