// Auth controller
import {Request, Response} from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
    const {name, email, password, role} = req.body;
    const user = await authService.registerUser(name, email, password, role);
    res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;
    const data = await authService.loginUser(email, password);
    res.json(data);
}