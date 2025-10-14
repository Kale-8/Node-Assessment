// Warehouse routes
import {Router} from "express";
import * as whCtrl from "../controllers/warehouse.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {toggleWarehouseSchema} from "../validators/warehouse.validator";

const router = Router();

router.get("/", authenticate, permit(["admin", "analyst"]), whCtrl.listWarehouses);
router.patch("/:id/active", authenticate, permit(["admin"]), validate(toggleWarehouseSchema, "body"), whCtrl.toggleWarehouse);
router.get("/:id/stock", authenticate, permit(["admin", "analyst"]), whCtrl.warehouseStock);

export default router;