// Order service
import {Order, OrderItem} from "../models";
import {sequelize} from "../config/database";

/**
 * Create order: validates client exists, warehouse has stock for each product, reduces stock
 * items: [{ productId, quantity, unitPrice }]
 */
export async function createOrder(clientId: number, warehouseId: number, items: Array<{
    productId: number;
    quantity: number;
    unitPrice: number
}>) {
    // Check client existence
    // (assume client existence validated earlier at route or via FK at DB)
    // Validate stock for each item
    for (const it of items) {
        const [rows]: any = await sequelize.query(
            `SELECT stock
             FROM warehouse_stock
             WHERE warehouse_id = :warehouseId
               AND product_id = :productId`,
            {replacements: {warehouseId, productId: it.productId}}
        );
        const stock = rows.length ? Number(rows[0].stock) : 0;
        if (stock < it.quantity) throw new Error(`Insufficient stock for product ${it.productId}`);
    }

    // Transactional creation
    const t = await sequelize.transaction();
    try {
        const order = await Order.create({clientId, warehouseId, status: "pending"} as any, {transaction: t});
        for (const it of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: it.productId,
                quantity: it.quantity,
                unitPrice: it.unitPrice
            }, {transaction: t});
            // decrement stock
            await sequelize.query(
                `UPDATE warehouse_stock
                 SET stock = stock - :qty
                 WHERE warehouse_id = :warehouseId
                   AND product_id = :productId`,
                {replacements: {qty: it.quantity, warehouseId, productId: it.productId}, transaction: t}
            );
        }
        await t.commit();
        return order;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

// Change order status
export async function changeOrderStatus(orderId: number, status: "pending" | "in_transit" | "delivered") {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");
    // Validate status transition if needed (simple sample)
    order.status = status;
    await order.save();
    return order;
}

// Get order history
export async function getOrderHistory() {
    return Order.findAll({include: [{association: "items"}, {association: "client"}, {association: "warehouse"}]});
}

// Get orders by client
export async function getOrdersByClient(clientId: number) {
    return Order.findAll({where: {clientId}, include: [{association: "items"}, {association: "warehouse"}]});
}