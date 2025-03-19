import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import {Task} from "../task/task.entity";

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({name: 'created_at'})
    createdAt: Date

    @OneToMany(() => Task, (task) => task.list)
    tasks: [Task]
}