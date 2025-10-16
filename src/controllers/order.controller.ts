// Order controller
import {Request, Response, NextFunction} from "express";
import * as orderService from "../services/order.service";

export async function createOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const {clientId, warehouseId, items} = req.body;
        const order = await orderService.createOrder(clientId, warehouseId, items);
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
}

export async function changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const {status} = req.body;
        const order = await orderService.changeOrderStatus(id, status);
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export async function orderHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const history = await orderService.getOrderHistory();
        res.json(history);
    } catch (err) {
        next(err);
    }
}

export async function ordersByClient(req: Request, res: Response, next: NextFunction) {
    try {
        const clientId = Number(req.params.clientId);
        const orders = await orderService.getOrdersByClient(clientId);
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

export async function listOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const orders = await orderService.getOrderHistory();
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const order = await orderService.getOrderById(id);
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export async function updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const order = await orderService.updateOrder(id, req.body);
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await orderService.deleteOrder(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}