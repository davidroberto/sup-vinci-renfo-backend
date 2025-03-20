import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("date")
    public createdAt: Date;

    @Column("number")
    public price: number;

    @Column("string")
    public status: string;

    @Column({nullable: true, type: "date"})
    public validatedAt: Date;

    constructor(price: number) {

        if (price > 500) {
            throw new Error("Le prix ne peut pas être supérieur à 500");
        }

        this.price = price;
        this.createdAt = new Date();
        this.status = "PENDING";
    }


    validate() {
        this.status = "VALIDATED";
        this.validatedAt = new Date();
    }


}