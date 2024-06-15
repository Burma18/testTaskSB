import { Request, Response } from "express";
import prisma from "../plugins/prisma";
import path from "path";
import fs from "fs";

const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, gender } = req.body;

  let photo;

  if (req.file) {
    photo = req.file.filename;

    // deleting old photo
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (user && user.photo) {
      fs.unlinkSync(path.join(__dirname, "..", "uploads", user.photo));
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { firstName, lastName, gender, photo },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  const pageSize = 10;

  try {
    const users = await prisma.user.findMany({
      skip: (Number(page) - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  editUser,
  getUser,
  getUsers,
};
