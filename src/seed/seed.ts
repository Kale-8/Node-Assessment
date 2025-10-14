import dotenv from "dotenv";

dotenv.config();
import {sequelize} from "../config/database";
import {User, Client, Address, Warehouse, Product} from "../models";
import bcrypt from "bcrypt";

async function seed() {
    await sequelize.authenticate();
    // create tables if not exist
    await sequelize.sync({alter: true});

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    // Users
    const adminPass = await bcrypt.hash("admin123", saltRounds);
    const analystPass = await bcrypt.hash("analyst123", saltRounds);

    await User.findOrCreate({
        where: {email: "admin@fhl.com"},
        defaults: {name: "Admin", password: adminPass, role: "admin"}
    });
    await User.findOrCreate({
        where: {email: "analyst@fhl.com"},
        defaults: {name: "Analyst", password: analystPass, role: "analyst"}
    });

    // Clients
    const [c1] = await Client.findOrCreate({
        where: {document: "1001"},
        defaults: {name: "Client One", email: "client1@example.com"}
    });
    const [c2] = await Client.findOrCreate({
        where: {document: "1002"},
        defaults: {name: "Client Two", email: "client2@example.com"}
    });

    await Address.findOrCreate({where: {clientId: c1.id, address: "123 Main St"}, defaults: {city: "Bogota"}});
    await Address.findOrCreate({where: {clientId: c2.id, address: "456 Secondary"}, defaults: {city: "Medellin"}});

    // Warehouses
    const [w1] = await Warehouse.findOrCreate({where: {name: "Bogota Warehouse"}, defaults: {active: true}});
    const [w2] = await Warehouse.findOrCreate({where: {name: "Medellin Warehouse"}, defaults: {active: true}});

    // Products
    const [p1] = await Product.findOrCreate({
        where: {code: "P001"},
        defaults: {name: "Widget A", description: "Small widget"}
    });
    const [p2] = await Product.findOrCreate({
        where: {code: "P002"},
        defaults: {name: "Widget B", description: "Medium widget"}
    });

    // Create warehouse_stock table and insert stock if not exists
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS warehouse_stock
        (
            warehouse_id
            integer
            NOT
            NULL,
            product_id
            integer
            NOT
            NULL,
            stock
            integer
            NOT
            NULL
            DEFAULT
            0,
            PRIMARY
            KEY
        (
            warehouse_id,
            product_id
        )
            );
    `);

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w1, :p1, 100) ON CONFLICT (warehouse_id, product_id) DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w1: w1.id, p1: p1.id}}
    );

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w1, :p2, 50) ON CONFLICT (warehouse_id, product_id) DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w1: w1.id, p2: p2.id}}
    );

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w2, :p1, 30) ON CONFLICT (warehouse_id, product_id) DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w2: w2.id, p1: p1.id}}
    );

    console.log("Seed completed");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});