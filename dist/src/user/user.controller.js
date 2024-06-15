"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../plugins/prisma"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, gender } = req.body;
    let photo;
    if (req.file) {
        photo = req.file.filename;
        // deleting old photo
        const user = yield prisma_1.default.user.findUnique({ where: { id: Number(id) } });
        if (user && user.photo) {
            fs_1.default.unlinkSync(path_1.default.join(__dirname, "..", "uploads", user.photo));
        }
    }
    try {
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: Number(id) },
            data: { firstName, lastName, gender, photo },
        });
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.default.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1 } = req.query;
    const pageSize = 10;
    try {
        const users = yield prisma_1.default.user.findMany({
            skip: (Number(page) - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = {
    editUser,
    getUser,
    getUsers,
};
