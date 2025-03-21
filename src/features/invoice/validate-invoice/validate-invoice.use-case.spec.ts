import ValidateInvoiceUseCase from "./validate-invoice.use-case";
import {Invoice} from "../invoice.entity";

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


    test("Quand la facture n'a pas un status en attente, je dois renvoyer une erreur", async () => {

        // je mets le système dans un état où la facture n'est pas en attente
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

        const validateInvoiceUseCase = new ValidateInvoiceUseCase(invoiceRepositoryMock);

        expect(validateInvoiceUseCase.validateInvoice(1)).rejects.toThrowError("La facture a déjà été validée");
    });

});