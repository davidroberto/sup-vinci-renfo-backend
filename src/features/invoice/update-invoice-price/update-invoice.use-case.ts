import InvoiceRepositoryInterface from "../invoice.repository.interface";
import {Invoice} from "../invoice.entity";

export default class UpdateInvoicePriceUseCase {


    constructor(private invoiceRepository: InvoiceRepositoryInterface) {}

    async updateInvoice(invoiceId: number, newPrice: number): Promise<Invoice> {

        const invoice = await this.invoiceRepository.findOneBy({id: invoiceId});

        invoice.updatePrice(newPrice);

        return await this.invoiceRepository.save(invoice);

    }

}