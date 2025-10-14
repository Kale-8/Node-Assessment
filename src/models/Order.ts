// Order model
import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

export class Order extends Model {
    public id!: number;
    public clientId!: number;
    public warehouseId!: number;
    public status!: "pending" | "in_transit" | "delivered";
    public createdAt!: Date;
}

Order.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        clientId: {type: DataTypes.INTEGER, allowNull: false},
        warehouseId: {type: DataTypes.INTEGER, allowNull: false},
        status: {
            type: DataTypes.ENUM("pending", "in_transit", "delivered"),
            allowNull: false,
            defaultValue: "pending",
        },
        createdAt: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    },
    {
        sequelize,
        tableName: "orders",
    }
);