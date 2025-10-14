import express from "express";
import cors from "cors";
import routes from "./routes";
import {errorHandler} from "./middlewares/error.middleware";
import {sequelize} from "./config/database";
import "./models"; // load models & associations
import "express-async-errors"; // handle async errors
import {setupSwagger} from "./docs/swagger";

export function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    setupSwagger(app);
    app.use("/api", routes);
    app.use(errorHandler);
    return app;
}

// test db connection
export async function initDb() {
    await sequelize.authenticate();
    // Sync models for tests/dev:
    await sequelize.sync({alter: false});
}