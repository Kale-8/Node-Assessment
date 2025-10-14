// Product controller
import {Request, Response} from "express";
import * as productService from "../services/product.service";

export async function getProductByCode(req: Request, res: Response) {
    const code = req.params.code;
    const p = await productService.getProductByCode(code);
    res.json(p);
}

export async function deleteProduct(req: Request, res: Response) {
    const code = req.params.code;
    const result = await productService.logicalDeleteProduct(code);
    res.json(result);
}