// Product model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: number;
    declare code: string;
    declare name: string;
    declare description: string | null;
    declare price: number;
    declare stock: number;
}

Product.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        code: {type: DataTypes.STRING, allowNull: false, unique: true},
        name: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: true},
        price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
        stock: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    },
    {
        sequelize,
        tableName: "products",
    }
);