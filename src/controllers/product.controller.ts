// Product controller
import {Request, Response, NextFunction} from "express";
import * as productService from "../services/product.service";

export async function getProductByCode(req: Request, res: Response, next: NextFunction) {
    try {
        const code = req.params.code;
        const p = await productService.getProductByCode(code);
        res.json(p);
    } catch (err) {
        next(err);
    }
}

export async function listProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await productService.listProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const {code, name, description, price, stock} = req.body;
        const product = await productService.createProduct(code, name, description, price, stock);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const code = req.params.code;
        const product = await productService.updateProduct(code, req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const code = req.params.code;
        const result = await productService.logicalDeleteProduct(code);
        res.json(result);
    } catch (err) {
        next(err);
    }
}