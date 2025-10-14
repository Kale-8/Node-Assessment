// Address routes
import {Router} from "express";
import * as addressCtrl from "../controllers/address.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {createAddressSchema, updateAddressSchema} from "../validators/address.validator";

const router = Router();

router.post("/", authenticate, permit(["admin"]), validate(createAddressSchema, "body"), addressCtrl.createAddress);
router.get("/", authenticate, permit(["admin", "analyst"]), addressCtrl.listAddresses);
router.get("/:id", authenticate, permit(["admin", "analyst"]), addressCtrl.getAddressById);
router.put("/:id", authenticate, permit(["admin"]), validate(updateAddressSchema, "body"), addressCtrl.updateAddress);
router.delete("/:id", authenticate, permit(["admin"]), addressCtrl.deleteAddress);

export default router;