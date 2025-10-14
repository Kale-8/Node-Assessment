// DB connection
import dotenv from "dotenv";
import {Sequelize} from "sequelize";

dotenv.config();

const sqlUri = process.env.SQL_URI as string;

if (!sqlUri) {
    throw new Error("SQL_URI not defined in env");
}

export const sequelize = new Sequelize(sqlUri, {
    logging: false,
    define: {
        underscored: true,
        timestamps: false,
    },
});

export default sequelize;