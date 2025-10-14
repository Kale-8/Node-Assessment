// Order controller
import {Request, Response} from "express";
import * as orderService from "../services/order.service";

export async function createOrder(req: Request, res: Response) {
    const {clientId, warehouseId, items} = req.body;
    const order = await orderService.createOrder(clientId, warehouseId, items);
    res.status(201).json(order);
}

export async function changeStatus(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {status} = req.body;
    const order = await orderService.changeOrderStatus(id, status);
    res.json(order);
}

export async function orderHistory(req: Request, res: Response) {
    const history = await orderService.getOrderHistory();
    res.json(history);
}

export async function ordersByClient(req: Request, res: Response) {
    const clientId = Number(req.params.clientId);
    const orders = await orderService.getOrdersByClient(clientId);
    res.json(orders);
}