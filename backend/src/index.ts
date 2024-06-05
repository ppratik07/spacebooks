import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { register } from "./zod/Register";
const app = express();
const PORT = 3000;

app.use(express.json());
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

app.post("/signup", async (req, res) => {
  const { success } = register.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Please send correct inputs",
    });
  }
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
    },
  });
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "User created successfully",
    jwt: token,
  });
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
