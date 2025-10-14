// OrderItem model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
    declare orderId: number;
    declare productId: number;
    declare quantity: number;
    declare unitPrice: number;
}

OrderItem.init(
    {
        orderId: {field: "order_id", type: DataTypes.INTEGER, primaryKey: true},
        productId: {field: "product_id", type: DataTypes.INTEGER, primaryKey: true},
        quantity: {type: DataTypes.INTEGER, allowNull: false},
        unitPrice: {field: "unit_price", type: DataTypes.DECIMAL, allowNull: false},
    },
    {
        sequelize,
        tableName: "order_items",
    }
);