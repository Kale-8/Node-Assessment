// Address controller
import {Request, Response, NextFunction} from "express";
import * as addressService from "../services/address.service";

export async function createAddress(req: Request, res: Response, next: NextFunction) {
    try {
        const {clientId, address, city} = req.body;
        const addressRecord = await addressService.createAddress(clientId, address, city);
        res.status(201).json(addressRecord);
    } catch (err) {
        next(err);
    }
}

export async function listAddresses(req: Request, res: Response, next: NextFunction) {
    try {
        const addresses = await addressService.listAddresses();
        res.json(addresses);
    } catch (err) {
        next(err);
    }
}

export async function getAddressById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const addressRecord = await addressService.getAddressById(id);
        res.json(addressRecord);
    } catch (err) {
        next(err);
    }
}

export async function updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const addressRecord = await addressService.updateAddress(id, req.body);
        res.json(addressRecord);
    } catch (err) {
        next(err);
    }
}

export async function deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        await addressService.deleteAddress(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}