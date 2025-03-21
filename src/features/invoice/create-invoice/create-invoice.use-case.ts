import typeOrmDataSource from "../../../config/db.config";
import {Invoice} from "../invoice.entity";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

type CreateInvoiceDto = {
    price: number;
}


export default class CreateInvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepositoryInterface) {}

    public async createInvoice({price}: CreateInvoiceDto): Promise<Invoice> {
        const invoice = new Invoice(price);

        return await this.invoiceRepository.save(invoice);
    }


}