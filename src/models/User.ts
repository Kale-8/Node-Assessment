// User model
import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import sequelize from "../config/database";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: "admin" | "analyst";
}

User.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.ENUM("admin", "analyst"), allowNull: false},
    },
    {
        sequelize,
        tableName: "users",
    }
);