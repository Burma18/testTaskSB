import { Router } from "express";
import userController from "./user.controller";
import auth from "../middleware/auth.middleware";
import { userSchema } from "./user.schema";
import validate from "../middleware/validate.middleware";
import upload from "../utils/fileUpload";

const router = Router();

router.put(
  "/profile/:id",
  auth,
  upload.single("file"),
  userSchema,
  validate,
  userController.editUser
);
router.get("/profile/:id", auth, userController.getUser);
router.get("/profiles", auth, userController.getUsers);

export default router;
