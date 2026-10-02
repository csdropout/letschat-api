import { prisma } from "../lib/prisma.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export async function postLogin(req, res) {
  res.json({ message: "Login successful" });
}

export const postSignUp = [
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],

  async function (req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { username, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { username } });
    if (userExists)
      return res.status(409).json({ error: "Username is in use" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { username, hash },
    });
    if (!user) return res.status(500).json({ error: "" });
    return res.status(201).json({ message: "User created successfully" });
  },
];

export async function postLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err);
    }
  });
  return res.status(200).json({ message: "Logged out successfully" });
}
