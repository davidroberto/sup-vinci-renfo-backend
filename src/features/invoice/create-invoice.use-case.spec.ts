import CreateInvoiceUseCase from "./create-invoice.use-case";
import {Invoice} from "./invoice.entity";

describe("En tant qu'artisan, je veux créer une facture",  () => {

    test("Quand je créé une facture avec un prix à 200. La facture générée doit contenir une date, un prix à 200 et un status en attente", async () => {

        const fakeInvoiceRepository = {
            save: (invoice: Invoice) => {
                return invoice;
            }
        }

        const createInvoiceUseCase = new CreateInvoiceUseCase(fakeInvoiceRepository);

        const invoice = await createInvoiceUseCase.createInvoice({price: 250});

        expect(invoice.price).toBe(250);
        expect(invoice.status).toBe('PENDING');
        expect(invoice.createdAt).toBeInstanceOf(Date);
    });


    test("Quand je créé une facture avec un prix à 750, une erreur doit être renvoyée", async () => {
        const createInvoiceUseCase = new CreateInvoiceUseCase();

        expect(createInvoiceUseCase.createInvoice({price: 750})).rejects.toThrowError("Le prix ne peut pas être supérieur à 500");
    });



});
