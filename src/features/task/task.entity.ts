import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import {List} from "../list/list.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @Column({name: 'created_at'})
    createdAt: Date

    @Column({name: 'is_done'})
    isDone: boolean

    @ManyToOne(() => List, (list) => list.tasks)
    @JoinColumn({name: "list_id"})
    list: List

}