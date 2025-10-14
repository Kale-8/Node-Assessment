// Relations and exports
import sequelize from "../config/database";
import {User} from "./User";
import {Client} from "./Client";
import {Address} from "./Address";
import {Warehouse} from "./Warehouse";
import {Product} from "./Product";
import {Order} from "./Order";
import {OrderItem} from "./OrderItem";

// Client - Address (1 - M)
Client.hasMany(Address, {foreignKey: "clientId", as: "addresses"});
Address.belongsTo(Client, {foreignKey: "clientId", as: "client"});

// Order - Client
Client.hasMany(Order, {foreignKey: "clientId", as: "orders"});
Order.belongsTo(Client, {foreignKey: "clientId", as: "client"});

// Order - Warehouse
Warehouse.hasMany(Order, {foreignKey: "warehouseId", as: "orders"});
Order.belongsTo(Warehouse, {foreignKey: "warehouseId", as: "warehouse"});

// Order - OrderItem (1 - M)
Order.hasMany(OrderItem, {foreignKey: "orderId", as: "items"});
OrderItem.belongsTo(Order, {foreignKey: "orderId", as: "order"});

// Product - OrderItem (1 - M)
Product.hasMany(OrderItem, {foreignKey: "productId", as: "orderItems"});
OrderItem.belongsTo(Product, {foreignKey: "productId", as: "product"});

export {
    sequelize,
    User,
    Client,
    Address,
    Warehouse,
    Product,
    Order,
    OrderItem,
};