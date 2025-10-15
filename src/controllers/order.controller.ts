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

export async function listOrders(req: Request, res: Response) {
    const orders = await orderService.getOrderHistory();
    res.json(orders);
}

export async function getOrderById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await orderService.getOrderById(id);
    res.json(order);
}

export async function updateOrder(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await orderService.updateOrder(id, req.body);
    res.json(order);
}

export async function deleteOrder(req: Request, res: Response) {
    const id = Number(req.params.id);
    await orderService.deleteOrder(id);
    res.status(204).send();
}