import ValidateInvoiceUseCase from "./validate-invoice.use-case";
import {Invoice} from "./invoice.entity";

describe("En tant qu'administrateur, je veux pouvoir valider une facture", () => {

    test("Quand j'envoie l'id 1, la facture 1 doit avoir un status 'validé' et une date de validation", async () => {

        const invoice = new Invoice(100);

        const invoiceRepositoryMock = {
            findOneBy: ({id}: {
                id: number
            }) => {
                return invoice;
            },
            save: (invoice: Invoice) => {
                return invoice;
            }
        }

        const validateInvoiceUseCase = new ValidateInvoiceUseCase(invoiceRepositoryMock);
        const invoiceValidated = await validateInvoiceUseCase.validateInvoice(1);

        expect(invoiceValidated.status).toBe('VALIDATED');
        expect(invoiceValidated.validatedAt).toBeInstanceOf(Date);

    });

});