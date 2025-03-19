import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Invoice {

    // toute la logique métier
    constructor(price: number) {

        if (price > 500) {
            throw new Error("Le prix ne peut pas être supérieur à 500");
        }

        this.price = price;
        this.createdAt = new Date();
        this.status = "PENDING";
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public createdAt: Date;

    @Column()
    public price: number;

    @Column()
    public status: string;

}