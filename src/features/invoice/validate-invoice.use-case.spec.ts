import ValidateInvoiceUseCase from "./validate-invoice.use-case";

describe("En tant qu'administrateur, je veux pouvoir valider une facture", () => {

    test("Quand j'envoie l'id 1, la facture 1 doit avoir un status 'validé' et une date de validation", async () => {

        const validateInvoiceUseCase = new ValidateInvoiceUseCase();
        const invoice = await validateInvoiceUseCase.validateInvoice(1);

        expect(invoice.status).toBe('VALIDATED');
        expect(invoice.validatedAt).toBeInstanceOf(Date);

    });

});