// Address model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    declare id: number;
    declare clientId: number;
    declare address: string;
    declare city: string;
}

Address.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        clientId: {field: "client_id", type: DataTypes.INTEGER, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false},
    },
    {
        sequelize,
        tableName: "addresses",
    }
);