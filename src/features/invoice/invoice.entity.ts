import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


export enum invoiceStatus {
    PENDING = "PENDING",
    VALIDATED = "VALIDATED",
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

    constructor(price: number) {

        if (price > 500) {
            throw new Error("Le prix ne peut pas être supérieur à 500");
        }

        this.price = price;
        this.createdAt = new Date();
        this.status = invoiceStatus.PENDING;
    }


    validate() {
        this.status = invoiceStatus.VALIDATED;
        this.validatedAt = new Date();
    }


}