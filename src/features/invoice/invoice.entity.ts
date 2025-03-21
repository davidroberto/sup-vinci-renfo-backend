import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


export enum invoiceStatus {
    PENDING = "PENDING",
    VALIDATED = "VALIDATED",
    CANCELED = "CANCELED",
    PAID = "PAID"
}

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: true, type: "date"})
    public createdAt: Date;

    @Column({nullable: true, type: "float"})
    public price: number;

    @Column({nullable: true, type: "text"})
    public status: string;

    @Column({nullable: true, type: "date"})
    public validatedAt: Date;

    @Column({nullable: true, type: "date"})
    public canceledAt: Date;

    @Column({nullable: true, type: "date"})
    public paidAt: Date;

    @Column({nullable: true, type: "date"})
    public updatedAt: Date;

    constructor(price: number) {

        if (price > 500) {
            throw new Error("Le prix ne peut pas être supérieur à 500");
        }

        this.price = price;
        this.createdAt = new Date();
        this.status = invoiceStatus.PENDING;
    }


    validate() {
        if (this.status !== invoiceStatus.PENDING) {
            throw new Error("La facture a déjà été validée");
        }

        this.status = invoiceStatus.VALIDATED;
        this.validatedAt = new Date();
    }

    cancel() {
        if (this.status !== invoiceStatus.PENDING) {
            throw new Error("La facture a déjà été annulée");
        }

        this.status = invoiceStatus.CANCELED;
        this.canceledAt = new Date();
    }

    pay() {
        if (this.status !== invoiceStatus.VALIDATED) {
            throw new Error("La facture doit être validée pour être payée");
        }

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        if (this.createdAt < threeMonthsAgo) {
            throw new Error("La facture est trop ancienne pour être payée");
        }

        this.status = invoiceStatus.PAID;
        this.paidAt = new Date();
    }


    updatePrice(newPrice: number) {

        if (this.status !== invoiceStatus.PENDING) {
            throw new Error("La facture a déjà été validée");
        }


        this.price = newPrice;
        this.updatedAt = new Date();
    }

}