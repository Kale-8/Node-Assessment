// Client routes
import {Router} from "express";
import * as clientCtrl from "../controllers/client.controller";
import {authenticate} from "../middlewares/auth.middleware";
import {permit} from "../middlewares/role.middleware";
import {validate} from "../middlewares/validate.middleware";
import {createClientSchema, findClientByDocumentSchema, updateClientSchema} from "../validators/client.validator";

const router = Router();

router.post("/", authenticate, permit(["admin"]), validate(createClientSchema, "body"), clientCtrl.createClient);
router.get("/", authenticate, permit(["admin", "analyst"]), clientCtrl.listClients);
router.post("/find", authenticate, permit(["admin", "analyst"]), validate(findClientByDocumentSchema, "body"), clientCtrl.findClientByDocument);
router.get("/:id", authenticate, permit(["admin", "analyst"]), clientCtrl.getClientById);
router.put("/:id", authenticate, permit(["admin"]), validate(updateClientSchema, "body"), clientCtrl.updateClient);
router.delete("/:id", authenticate, permit(["admin"]), clientCtrl.deleteClient);

export default router;