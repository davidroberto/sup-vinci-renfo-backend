import typeOrmDataSource from "../../config/db.config";
import {Invoice} from "./invoice.entity";

export default class DeleteInvoiceUseCase {

    async deleteInvoice(invoiceId: number): Promise<void> {

        const invoiceRepository = typeOrmDataSource.getRepository<Invoice>(Invoice);

        const invoice = await invoiceRepository.findOneBy({id: invoiceId});

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        try {
            await invoiceRepository.delete(invoiceId);
        } catch (error) {
            throw new Error('Error deleting invoice');
        }

    }

}