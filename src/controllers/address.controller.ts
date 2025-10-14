// Address controller
import {Request, Response} from "express";
import * as addressService from "../services/address.service";

export async function createAddress(req: Request, res: Response) {
    const {clientId, address, city} = req.body;
    const addressRecord = await addressService.createAddress(clientId, address, city);
    res.status(201).json(addressRecord);
}

export async function listAddresses(req: Request, res: Response) {
    const addresses = await addressService.listAddresses();
    res.json(addresses);
}

export async function getAddressById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const addressRecord = await addressService.getAddressById(id);
    res.json(addressRecord);
}

export async function updateAddress(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const addressRecord = await addressService.updateAddress(id, req.body);
    res.json(addressRecord);
}

export async function deleteAddress(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await addressService.deleteAddress(id);
    res.status(204).send();
}