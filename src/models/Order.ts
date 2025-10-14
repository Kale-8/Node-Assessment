// Order model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: number;
    declare clientId: number;
    declare warehouseId: number;
    declare status: "pending" | "in_transit" | "delivered";
    declare createdAt: Date;
}

Order.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        clientId: {field: "client_id", type: DataTypes.INTEGER, allowNull: false},
        warehouseId: {field: "warehouse_id", type: DataTypes.INTEGER, allowNull: false},
        status: {
            type: DataTypes.ENUM("pending", "in_transit", "delivered"),
            allowNull: false,
            defaultValue: "pending",
        },
        createdAt: {field: "created_at", type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    },
    {
        sequelize,
        tableName: "orders",
    }
);