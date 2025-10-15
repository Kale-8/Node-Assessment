// Product routes
import {Router} from "express";
import * as pCtrl from "../controllers/product.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {codeParamSchema, createProductSchema, updateProductSchema} from "../validators/product.validator";

const router = Router();

router.get("/", authenticate, permit(["admin", "analyst"]), pCtrl.listProducts);
router.post("/", authenticate, permit(["admin"]), validate(createProductSchema, "body"), pCtrl.createProduct);
router.get("/:code", authenticate, permit(["admin", "analyst"]), validate(codeParamSchema, "params"), pCtrl.getProductByCode);
router.put("/:code", authenticate, permit(["admin"]), validate(codeParamSchema, "params"), validate(updateProductSchema, "body"), pCtrl.updateProduct);
router.delete("/:code", authenticate, permit(["admin"]), validate(codeParamSchema, "params"), pCtrl.deleteProduct);

export default router;