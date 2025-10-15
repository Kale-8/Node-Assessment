// Order routes
import {Router} from "express";
import * as orderCtrl from "../controllers/order.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {createOrderSchema, changeStatusSchema, updateOrderSchema, idParamSchema} from "../validators/order.validator";

const router = Router();

router.get("/", authenticate, permit(["admin", "analyst"]), orderCtrl.listOrders);
router.post("/", authenticate, permit(["admin"]), validate(createOrderSchema, "body"), orderCtrl.createOrder);
router.get("/:id", authenticate, permit(["admin", "analyst"]), validate(idParamSchema, "params"), orderCtrl.getOrderById);
router.put("/:id", authenticate, permit(["admin"]), validate(idParamSchema, "params"), validate(updateOrderSchema, "body"), orderCtrl.updateOrder);
router.delete("/:id", authenticate, permit(["admin"]), validate(idParamSchema, "params"), orderCtrl.deleteOrder);
router.patch("/:id/status", authenticate, permit(["admin", "analyst"]), validate(changeStatusSchema, "body"), orderCtrl.changeStatus);
router.get("/history", authenticate, permit(["admin", "analyst"]), orderCtrl.orderHistory);
router.get("/client/:clientId", authenticate, permit(["admin", "analyst"]), orderCtrl.ordersByClient);

export default router;