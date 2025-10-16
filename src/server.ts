import dotenv from "dotenv";

dotenv.config();

import {createApp, initDb} from "./app";

const PORT = Number(process.env.PORT);
const app = createApp();

// Development hardening: prevent process exit on unhandled errors
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize db", err);
        process.exit(1);
    });