// Warehouse model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class Warehouse extends Model<InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
    declare id: number;
    declare name: string;
    declare location: string;
    declare active: boolean;
}

Warehouse.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        location: {type: DataTypes.STRING, allowNull: false},
        active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    },
    {
        sequelize,
        tableName: "warehouses",
    }
);