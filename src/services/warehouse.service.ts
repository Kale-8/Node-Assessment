// Warehouse service
import {Warehouse, Product} from "../models";
import {sequelize} from "../config/database";

// List active warehouses
export async function listActiveWarehouses() {
    return Warehouse.findAll();
}

// Create warehouse
export async function createWarehouse(name: string, location: string) {
    return await Warehouse.create({name, location, active: true} as any);
}

// Find warehouses by id and changes active status
export async function toggleWarehouseActive(id: number, active: boolean) {
    const wh = await Warehouse.findByPk(id);
    if (!wh) throw new Error("Warehouse not found");
    wh.active = active;
    await wh.save();
    return wh;
}

//Get stock for a warehouse: reads raw warehouse_stock table
export async function getWarehouseStock(warehouseId: number) {
    const [results] = await sequelize.query(
        `SELECT p.id, p.code, p.name, ws.stock
         FROM products p
                  JOIN warehouse_stock ws ON ws.product_id = p.id
         WHERE ws.warehouse_id = :warehouseId`,
        {replacements: {warehouseId}}
    );
    return results;
}