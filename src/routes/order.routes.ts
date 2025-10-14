// Order routes
import {Router} from "express";
import * as orderCtrl from "../controllers/order.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {createOrderSchema, changeStatusSchema} from "../validators/order.validator";

const router = Router();

router.post("/", authenticate, permit(["admin"]), validate(createOrderSchema, "body"), orderCtrl.createOrder);
router.patch("/:id/status", authenticate, permit(["admin", "analyst"]), validate(changeStatusSchema, "body"), orderCtrl.changeStatus);
router.get("/history", authenticate, permit(["admin", "analyst"]), orderCtrl.orderHistory);
router.get("/client/:clientId", authenticate, permit(["admin", "analyst"]), orderCtrl.ordersByClient);

export default router;