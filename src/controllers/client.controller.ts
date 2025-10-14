// Client controller
import {Request, Response} from "express";
import * as clientService from "../services/client.service";

export async function createClient(req: Request, res: Response) {
    const {document, name, email} = req.body;
    const client = await clientService.createClient(document, name, email);
    res.status(201).json(client);
}

export async function listClients(req: Request, res: Response) {
    const clients = await clientService.listClients();
    res.json(clients);
}

export async function findClientByDocument(req: Request, res: Response) {
    const {document} = req.body;
    const client = await clientService.findClientByDocument(document);
    res.json(client);
}