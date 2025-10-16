// User controller
import {Request, Response, NextFunction} from "express";
import * as userService from "../services/user.service";

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.findUserById(Number(req.params.id));
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {name, email, password, role} = req.body;
        const user = await userService.createUser(name, email, password, role);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.updateUser(Number(req.params.id), req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        await userService.deleteUser(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}