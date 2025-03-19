const express = require("express");
const cors = require("cors");
require("dotenv").config({path: '.env.local'})
const tokenVerification = require("../../src/features/authentication/authenticate.middleware");

import typeOrmDataSource from "./db.config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(tokenVerification);

typeOrmDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(process.env.PORT, () => console.log('Server started'));
    })
    .catch((err: Error) => {
        console.error("Error during Data Source initialization:", err)
    })

export default app;