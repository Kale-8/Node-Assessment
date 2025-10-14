import dotenv from "dotenv";

dotenv.config();
import {createApp, initDb} from "./app";

const PORT = Number(process.env.PORT);
const app = createApp();

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