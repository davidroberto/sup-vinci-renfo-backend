import {Invoice} from "../invoice.entity";
import UpdateInvoicePriceUseCase from "./update-invoice.use-case";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

describe("En tant qu'artisan, je veux pouvoir modifier le prix d'une facture", () => {


    test("Après modification d'une facture en attente à 200e, la facture doit contenir le prix envoyé (300e) et une date de modification", async() => {

        const invoice = new Invoice(200);

        const invoiceRepositoryMock = {
            findOneBy: ({id}: {id: number}) => invoice,
            save: (invoice: Invoice) => invoice
        } as unknown as InvoiceRepositoryInterface;

        const updateInvoiceUseCase = new UpdateInvoicePriceUseCase(invoiceRepositoryMock);
        const invoiceUpdated = await updateInvoiceUseCase.updateInvoice(1, 300);

        expect(invoiceUpdated.price).toBe(300);
        expect(invoiceUpdated.updatedAt).not.toBeNull();

    });

    test("Quand j'essaie de modifier le prix d'une facture qui n'est pas en attente, une erreur doit être renvoyée", async() => {

        const invoice = new Invoice(200);
        invoice.validate();

        const invoiceRepositoryMock = {
            findOneBy: ({id}: {id: number}) => invoice,
            save: (invoice: Invoice) => invoice
        } as unknown as InvoiceRepositoryInterface;

        const updateInvoiceUseCase = new UpdateInvoicePriceUseCase(invoiceRepositoryMock);

        expect(updateInvoiceUseCase.updateInvoice(1, 300)).rejects.toThrowError("La facture a déjà été validée");

    });

});