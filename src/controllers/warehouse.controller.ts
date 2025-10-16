// Warehouse controller
import {Request, Response, NextFunction} from "express";
import * as warehouseService from "../services/warehouse.service";

export async function listWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
        const warehouses = await warehouseService.listActiveWarehouses();
        res.json(warehouses);
    } catch (err) {
        next(err);
    }
}

export async function createWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
        const {name, location} = req.body;
        const warehouse = await warehouseService.createWarehouse(name, location);
        res.status(201).json(warehouse);
    } catch (err) {
        next(err);
    }
}

export async function toggleWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const {active} = req.body;
        const wh = await warehouseService.toggleWarehouseActive(id, active);
        res.json(wh);
    } catch (err) {
        next(err);
    }
}

export async function warehouseStock(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const stock = await warehouseService.getWarehouseStock(id);
        res.json(stock);
    } catch (err) {
        next(err);
    }
}