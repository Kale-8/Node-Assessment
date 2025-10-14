import dotenv from "dotenv";

dotenv.config();

import bcrypt from "bcrypt";
import {
    sequelize,
    User,
    Client,
    Address,
    Warehouse,
    Product
} from "../models/index";

async function seed() {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log("✅ Database synced (force)");

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

    // ===========================
    // USERS
    // ===========================
    console.log("Creating users...");
    const adminPass = await bcrypt.hash("admin123", saltRounds);
    const analystPass = await bcrypt.hash("analyst123", saltRounds);

    await User.findOrCreate({
        where: {email: "admin@fhl.com"},
        defaults: {name: "Admin", password: adminPass, role: "admin"} as any
    });

    await User.findOrCreate({
        where: {email: "analyst@fhl.com"},
        defaults: {name: "Analyst", password: analystPass, role: "analyst"} as any
    });

    // ===========================
    // CLIENTS
    // ===========================
    console.log("Creating clients...");
    const [c1] = await Client.findOrCreate({
        where: {document: "1001"},
        defaults: {name: "Client One", email: "client1@example.com"} as any
    });

    const [c2] = await Client.findOrCreate({
        where: {document: "1002"},
        defaults: {name: "Client Two", email: "client2@example.com"} as any
    });

    const c1Id = c1.get("id");
    const c2Id = c2.get("id");

    console.log("Client1:", c1.toJSON());
    console.log("Client2:", c2.toJSON());
    console.log(`✅ Clients created -> IDs: C1=${c1Id}, C2=${c2Id}`);

    // ===========================
    // ADDRESSES
    // ===========================
    console.log("Creating addresses...");
    await Address.findOrCreate({
        where: {clientId: c1Id, address: "123 Main St"},
        defaults: {city: "Bogota"} as any
    });

    await Address.findOrCreate({
        where: {clientId: c2Id, address: "456 Secondary"},
        defaults: {city: "Medellin"} as any
    });

    // ===========================
    // WAREHOUSES
    // ===========================
    console.log("Creating warehouses...");
    const [w1] = await Warehouse.findOrCreate({
        where: {name: "Bogota Warehouse"},
        defaults: {location: "Bogotá, Colombia", active: true} as any
    });

    const [w2] = await Warehouse.findOrCreate({
        where: {name: "Medellin Warehouse"},
        defaults: {location: "Medellín, Colombia", active: true} as any
    });

    const w1Id = w1.get("id");
    const w2Id = w2.get("id");

    console.log(`✅ Warehouses created -> W1=${w1Id}, W2=${w2Id}`);

    // ===========================
    // PRODUCTS
    // ===========================
    console.log("Creating products...");
    const [p1] = await Product.findOrCreate({
        where: {code: "P001"},
        defaults: {name: "Widget A", description: "Small widget", price: 25.50, stock: 100} as any
    });

    const [p2] = await Product.findOrCreate({
        where: {code: "P002"},
        defaults: {name: "Widget B", description: "Medium widget", price: 45.75, stock: 50} as any
    });

    const p1Id = p1.get("id");
    const p2Id = p2.get("id");

    console.log(`✅ Products created -> P1=${p1Id}, P2=${p2Id}`);

    // ===========================
    // WAREHOUSE STOCK (RAW SQL)
    // ===========================
    console.log("Creating warehouse_stock table and seeding data...");

    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS warehouse_stock
        (
            warehouse_id
            INTEGER
            NOT
            NULL
            REFERENCES
            warehouses
        (
            id
        ) ON DELETE CASCADE,
            product_id INTEGER NOT NULL REFERENCES products
        (
            id
        )
          ON DELETE CASCADE,
            stock INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY
        (
            warehouse_id,
            product_id
        )
            );
    `);

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w1, :p1, 100) ON CONFLICT (warehouse_id, product_id)
         DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w1: w1Id, p1: p1Id}}
    );

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w1, :p2, 50) ON CONFLICT (warehouse_id, product_id)
         DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w1: w1Id, p2: p2Id}}
    );

    await sequelize.query(
        `INSERT INTO warehouse_stock (warehouse_id, product_id, stock)
         VALUES (:w2, :p1, 30) ON CONFLICT (warehouse_id, product_id)
         DO
        UPDATE SET stock = EXCLUDED.stock;`,
        {replacements: {w2: w2Id, p1: p1Id}}
    );

    console.log("✅ Warehouse stock seeded successfully");
    console.log("🎉 Seed completed successfully");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});