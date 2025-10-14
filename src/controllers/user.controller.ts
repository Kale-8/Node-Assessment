// User controller
import {Request, Response} from "express";
import * as userService from "../services/user.service";

export async function listUsers(req: Request, res: Response) {
    const users = await userService.listUsers();
    res.json(users);
}

export async function getUserById(req: Request, res: Response) {
    const user = await userService.findUserById(Number(req.params.id));
    res.json(user);
}

export async function createUser(req: Request, res: Response) {
    const {name, email, password, role} = req.body;
    const user = await userService.createUser(name, email, password, role);
    res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
}