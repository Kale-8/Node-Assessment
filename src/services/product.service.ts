// Product service
import {Product} from "../models";

// Get product by code
export async function getProductByCode(code: string) {
    const product = await Product.findOne({where: {code}});
    if (!product) throw new Error("Product not found");
    return product;
}

// List all products
export async function listProducts() {
    return Product.findAll();
}

// Create product
export async function createProduct(code: string, name: string, description: string | null, price: number, stock: number) {
    const existing = await Product.findOne({where: {code}});
    if (existing) throw new Error("Product with same code already exists");
    return await Product.create({code, name, description, price, stock} as any);
}

// Update product
export async function updateProduct(code: string, data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
}) {
    const product = await Product.findOne({where: {code}});
    if (!product) throw new Error("Product not found");
    await product.update(data);
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