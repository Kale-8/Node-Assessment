// Routes export
import {Router} from "express";
import authRoutes from "./auth.routes";
import clientRoutes from "./client.routes";
import warehouseRoutes from "./warehouse.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes)
router.use("/clients", clientRoutes);
router.use("/warehouses", warehouseRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;