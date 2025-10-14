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

export async function getClientById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const client = await clientService.getClientById(id);
    res.json(client);
}

export async function updateClient(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const client = await clientService.updateClient(id, req.body);
    res.json(client);
}

export async function deleteClient(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await clientService.deleteClient(id);
    res.status(204).send();
}
