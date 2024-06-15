"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const express_validator_1 = require("express-validator");
exports.userSchema = [
    (0, express_validator_1.body)("firstName").optional().notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").optional().notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("gender")
        .optional()
        .isIn(["Male", "Female"])
        .withMessage("Gender must be Male or Female"),
    (0, express_validator_1.body)("photo")
        .optional()
        .isString()
        .withMessage("Photo must be a valid file name"),
];
