// Client model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
    declare id: number;
    declare document: string;
    declare name: string;
    declare email: string;
}

Client.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        document: {type: DataTypes.STRING, allowNull: false, unique: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
    },
    {
        sequelize,
        tableName: "clients",
    }
);