// Client controller
import {Request, Response, NextFunction} from "express";
import * as clientService from "../services/client.service";

export async function createClient(req: Request, res: Response, next: NextFunction) {
    try {
        const {document, name, email} = req.body;
        const client = await clientService.createClient(document, name, email);
        res.status(201).json(client);
    } catch (err) {
        next(err);
    }
}

export async function listClients(req: Request, res: Response, next: NextFunction) {
    try {
        const clients = await clientService.listClients();
        res.json(clients);
    } catch (err) {
        next(err);
    }
}

export async function findClientByDocument(req: Request, res: Response, next: NextFunction) {
    try {
        const {document} = req.body;
        const client = await clientService.findClientByDocument(document);
        res.json(client);
    } catch (err) {
        next(err);
    }
}

export async function getClientById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.getClientById(id);
        res.json(client);
    } catch (err) {
        next(err);
    }
}

export async function updateClient(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const client = await clientService.updateClient(id, req.body);
        res.json(client);
    } catch (err) {
        next(err);
    }
}

export async function deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        await clientService.deleteClient(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
