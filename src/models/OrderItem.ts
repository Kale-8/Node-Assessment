// OrderItem model
import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

export class OrderItem extends Model {
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public unitPrice!: number;
}

OrderItem.init(
    {
        orderId: {type: DataTypes.INTEGER, primaryKey: true},
        productId: {type: DataTypes.INTEGER, primaryKey: true},
        quantity: {type: DataTypes.INTEGER, allowNull: false},
        unitPrice: {type: DataTypes.DECIMAL, allowNull: false},
    },
    {
        sequelize,
        tableName: "order_items",
    }
);