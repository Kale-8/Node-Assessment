// User routes
import {Router} from "express";
import * as userCtrl from "../controllers/user.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {createUserSchema, updateUserSchema} from "../validators/user.validator";

const router = Router();

router.get("/", authenticate, permit(["admin", "analyst"]), userCtrl.listUsers);
router.get("/:id", authenticate, permit(["admin", "analyst"]), userCtrl.getUserById);
router.post("/", authenticate, permit(["admin"]), validate(createUserSchema, "body"), userCtrl.createUser);
router.put("/:id", authenticate, permit(["admin"]), validate(updateUserSchema, "body"), userCtrl.updateUser);
router.delete("/:id", authenticate, permit(["admin"]), userCtrl.deleteUser);

export default router;