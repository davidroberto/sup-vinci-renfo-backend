import {Invoice} from "../invoice.entity";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

export default class CancelInvoiceUseCase {

    constructor(private readonly invoiceRepository: InvoiceRepositoryInterface) {}

    async cancelInvoice(invoiceId: number): Promise<Invoice> {

        const invoice = await this.invoiceRepository.findOneBy({id: invoiceId});

        if (!invoice) {
            throw new Error("La facture n'existe pas");
        }

        invoice.cancel();

        try {
            return await this.invoiceRepository.save(invoice);
        } catch (error) {
            throw new Error("Impossible de sauvegarder la facture");
        }

    }

}