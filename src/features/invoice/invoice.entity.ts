import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public createdAt: Date;

    @Column()
    public price: number;

    @Column()
    public status: string;

}