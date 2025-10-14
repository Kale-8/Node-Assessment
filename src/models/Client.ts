// Client model
import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

export class Client extends Model {
    public id!: number;
    public document!: string;
    public name!: string;
    public email!: string;
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