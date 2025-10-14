// Auth routes
import {Router} from "express";
import * as authCtrl from "../controllers/auth.controller";
import {validate} from "../middlewares/validate.middleware";
import {registerSchema, loginSchema} from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema, "body"), authCtrl.register);
router.post("/login", validate(loginSchema, "body"), authCtrl.login);

export default router;