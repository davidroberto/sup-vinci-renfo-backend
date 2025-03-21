import ValidateInvoiceUseCase from "../validate-invoice/validate-invoice.use-case";
import {Invoice} from "../invoice.entity";
import CancelInvoiceUseCase from "../cancel-invoice/cancel-invoice.use-case";
import PayInvoiceUseCase from "./pay-invoice.use-case";

describe("En tant qu'administrateur, je veux pouvoir payer une facture", () => {

    test("Quand j'envoie l'id 1, la facture 1 doit avoir un status 'payée' et une date de paiement", async () => {

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
        }

        const payInvoiceUseCase = new PayInvoiceUseCase(invoiceRepositoryMock);
        const invoicePaid = await payInvoiceUseCase.payInvoice(1);

        expect(invoicePaid.status).toBe('PAID');
        expect(invoicePaid.paidAt).toBeInstanceOf(Date);

    });



    test("Quand la facture n'a pas un status en attente, je dois renvoyer une erreur", async () => {

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

        const payInvoiceUseCase = new PayInvoiceUseCase(invoiceRepositoryMock);
        expect(payInvoiceUseCase.payInvoice(1)).rejects.toThrowError("La facture doit être validée pour être payée");

    });


    test("Quand la facture a été créée il y a plus de trois mois, je dois renvoyer une erreur", async () => {
        const invoice = new Invoice(100);
        invoice.validate();
        invoice.createdAt = new Date(new Date().setMonth(new Date().getMonth() - 4));

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

        const payInvoiceUseCase = new PayInvoiceUseCase(invoiceRepositoryMock);
        expect(payInvoiceUseCase.payInvoice(1)).rejects.toThrowError("La facture est trop ancienne pour être payée");

    });


});