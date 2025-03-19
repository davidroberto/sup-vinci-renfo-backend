import { DataSource } from "typeorm";
import { Task } from "../features/task/task.entity";
import { List } from "../features/list/list.entity";

const typeOrmDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    entities: [
        Task, List
    ],
    logging: true,
    synchronize: true,
});

export default typeOrmDataSource;
