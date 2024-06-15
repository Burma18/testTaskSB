import { Router } from "express";
import authController from "./auth.controller";
import { userRegisterSchema, userLoginSchema } from "./auth.schema";
import validate from "../middleware/validate.middleware";

const router = Router();

router.post("/register", userRegisterSchema, validate, authController.register);
router.post("/login", userLoginSchema, validate, authController.login);

export default router;
