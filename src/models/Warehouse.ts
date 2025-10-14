// Warehouse model
import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

export class Warehouse extends Model {
    public id!: number;
    public name!: string;
    public active!: boolean;
}

Warehouse.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    },
    {
        sequelize,
        tableName: "warehouses",
    }
);