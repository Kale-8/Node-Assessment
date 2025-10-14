// Product routes
import {Router} from "express";
import * as pCtrl from "../controllers/product.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {codeParamSchema} from "../validators/product.validator";

const router = Router();

router.get("/:code", authenticate, permit(["admin", "analyst"]), validate(codeParamSchema, "params"), pCtrl.getProductByCode);
router.delete("/:code", authenticate, permit(["admin"]), validate(codeParamSchema, "params"), pCtrl.deleteProduct);

export default router;