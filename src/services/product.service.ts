// Product service
import {Product} from "../models";

// Get product by code
export async function getProductByCode(code: string) {
    const product = await Product.findOne({where: {code}});
    if (!product) throw new Error("Product not found");
    return product;
}

// Logical delete product
export async function logicalDeleteProduct(code: string) {
    const product = await Product.findOne({where: {code}});
    if (!product) throw new Error("Product not found");
    // softly delete = mark with code_x_deleted or move to another flag; since the model has no deleted flag, we rename code and name
    product.code = `${product.code}_deleted_${Date.now()}`;
    product.name = `${product.name} (deleted)`;
    await product.save();
    return {message: "Product logically deleted"};
}