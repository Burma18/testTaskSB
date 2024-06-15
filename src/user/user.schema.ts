import { body } from "express-validator";

export const userSchema = [
  body("firstName").optional().notEmpty().withMessage("First name is required"),
  body("lastName").optional().notEmpty().withMessage("Last name is required"),
  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),
  body("photo")
    .optional()
    .isString()
    .withMessage("Photo must be a valid file name"),
];
