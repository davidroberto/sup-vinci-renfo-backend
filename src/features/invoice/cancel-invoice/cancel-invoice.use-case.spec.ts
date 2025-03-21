import {Invoice} from "../invoice.entity";
import CancelInvoiceUseCase from "./cancel-invoice.use-case";
import InvoiceRepositoryInterface from "../invoice.repository.interface";

describe("En tant qu'administrateur, je veux pouvoir annuler une facture", () => {

    test("Quand j'envoie l'id 1, la facture 1 doit avoir un status 'annulée' et une date d'annulation", async () => {

        const invoice = new Invoice(100);

        const invoiceRepositoryMock = {
            findOneBy: ({id}: {
                id: number
            }) => {
                return invoice;
            },
            save: (invoice: Invoice) => {
                return invoice;
            },
        } as unknown as InvoiceRepositoryInterface;

        const canceledInvoiceUseCase = new CancelInvoiceUseCase(invoiceRepositoryMock);
        const invoiceCanceled = await canceledInvoiceUseCase.cancelInvoice(1);

        expect(invoiceCanceled.status).toBe('CANCELED');
        expect(invoiceCanceled.canceledAt).toBeInstanceOf(Date);

    });



    test("Quand la facture n'a pas un status en attente, je dois renvoyer une erreur", async () => {

        const invoice = new Invoice(100);
        invoice.validate();

        const invoiceRepositoryMock = {
            findOneBy: ({id}: {
                id: number
            }) => {
                return invoice;
            },
            save: (invoice: Invoice) => {
                return invoice;
            }
        } as unknown as InvoiceRepositoryInterface;

        const cancelInvoiceUseCase = new CancelInvoiceUseCase(invoiceRepositoryMock);

        expect(cancelInvoiceUseCase.cancelInvoice(1)).rejects.toThrowError("La facture a déjà été annulée");
    });


});