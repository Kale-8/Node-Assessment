// Warehouse controller
import {Request, Response} from "express";
import * as warehouseService from "../services/warehouse.service";

export async function listWarehouses(req: Request, res: Response) {
    const warehouses = await warehouseService.listActiveWarehouses();
    res.json(warehouses);
}

export async function createWarehouse(req: Request, res: Response) {
    const {name, location} = req.body;
    const warehouse = await warehouseService.createWarehouse(name, location);
    res.status(201).json(warehouse);
}

export async function toggleWarehouse(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {active} = req.body;
    const wh = await warehouseService.toggleWarehouseActive(id, active);
    res.json(wh);
}

export async function warehouseStock(req: Request, res: Response) {
    const id = Number(req.params.id);
    const stock = await warehouseService.getWarehouseStock(id);
    res.json(stock);
}