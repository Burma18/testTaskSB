"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const user_schema_1 = require("./user.schema");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const fileUpload_1 = __importDefault(require("../utils/fileUpload"));
const router = (0, express_1.Router)();
router.put("/profile/:id", auth_middleware_1.default, fileUpload_1.default.single("photo"), user_schema_1.userSchema, validate_middleware_1.default, user_controller_1.default.editUser);
router.get("/profile/:id", auth_middleware_1.default, user_controller_1.default.getUser);
router.get("/profiles", auth_middleware_1.default, user_controller_1.default.getUsers);
exports.default = router;
