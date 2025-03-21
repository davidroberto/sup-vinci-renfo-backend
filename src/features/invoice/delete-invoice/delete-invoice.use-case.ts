import typeOrmDataSource from "../../../config/db.config";
import {Invoice} from "../invoice.entity";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

export default class DeleteInvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepositoryInterface) {}

    async deleteInvoice(invoiceId: number): Promise<void> {

        const invoice = await this.invoiceRepository.findOneBy({id: invoiceId});

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        try {
            await this.invoiceRepository.delete(invoiceId);
        } catch (error) {
            throw new Error('Error deleting invoice');
        }

    }

}