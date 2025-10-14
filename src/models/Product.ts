// Product model
import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

export class Product extends Model {
    public id!: number;
    public code!: string;
    public name!: string;
    public description!: string | null;
}

Product.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        code: {type: DataTypes.STRING, allowNull: false, unique: true},
        name: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: true},
    },
    {
        sequelize,
        tableName: "products",
    }
);