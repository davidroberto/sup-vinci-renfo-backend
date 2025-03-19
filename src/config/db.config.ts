import { DataSource } from "typeorm";
import {Invoice} from "../features/invoice/invoice.entity";

const typeOrmDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    logging: true,
    entities: [Invoice],
    synchronize: true,
});

export default typeOrmDataSource;
