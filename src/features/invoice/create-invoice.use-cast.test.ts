import CreateInvoiceUseCase from "./create-invoice.use-case";

describe("En tant qu'artisan, je veux créer une facture",  () => {

    test("Quand je créé une facture avec un prix à 200. La facture générée doit contenir une date, un prix à 200 et un status en attente", async () => {
        const createInvoiceUseCase = new CreateInvoiceUseCase();
        const invoice = await createInvoiceUseCase.createInvoice({price: 250});

        expect(invoice.price).toBe(250);
        expect(invoice.status).toBe('PENDING');
        expect(invoice.createdAt).toBeInstanceOf(Date);
    });

});
