"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_schema_1 = require("./auth.schema");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const router = (0, express_1.Router)();
router.post("/register", auth_schema_1.userRegisterSchema, validate_middleware_1.default, auth_controller_1.default.register);
router.post("/login", auth_schema_1.userLoginSchema, validate_middleware_1.default, auth_controller_1.default.login);
exports.default = router;
