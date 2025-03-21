import CreateInvoiceUseCase from "./create-invoice.use-case";
import {Invoice} from "../invoice.entity";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

describe("En tant qu'artisan, je veux créer une facture",  () => {

    test("Quand je créé une facture avec un prix à 200. La facture générée doit contenir une date, un prix à 200 et un status en attente", async () => {

        const invoiceRepositoryMock = {
            save: (invoice: Invoice) => {
                return invoice;
            }
        } as unknown as InvoiceRepositoryInterface;

        const createInvoiceUseCase = new CreateInvoiceUseCase(invoiceRepositoryMock);

        const invoice = await createInvoiceUseCase.createInvoice({price: 250});

        expect(invoice.price).toBe(250);
        expect(invoice.status).toBe('PENDING');
        expect(invoice.createdAt).toBeInstanceOf(Date);
    });


    test("Quand je créé une facture avec un prix à 750, une erreur doit être renvoyée", async () => {

        const fakeInvoiceRepository = {
            save: (invoice: Invoice) => {
                return invoice;
            }
        } as unknown as InvoiceRepositoryInterface;

        const createInvoiceUseCase = new CreateInvoiceUseCase(fakeInvoiceRepository);

        expect(createInvoiceUseCase.createInvoice({price: 750})).rejects.toThrowError("Le prix ne peut pas être supérieur à 500");
    });
    
});
