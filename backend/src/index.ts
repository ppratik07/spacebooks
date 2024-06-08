import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { register } from "./zod/Register";
import { signin } from "./zod/Signin";
import authMiddleware from "./middlewares/auth";
import { resetpassword } from "./zod/ResetPassword";
const app = express();
const PORT = 3000;

app.use(express.json());
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

//Endpoints
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

app.post("/signin", async (req, res) => {
  const { success } = signin.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error signing in. Please check email and password!",
    });
  }
  const getUser = await prisma.user.findUnique({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  if (!getUser) {
    res.status(403).send({
      message: "user not found/Incorrect credentials",
    });
  }
  const token = await jwt.sign({ id: getUser?.id }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "User signed in successfully",
    jwt: token,
  });
});

app.get("/reset-password", async(req, res) => {
  const { success } = resetpassword.safeParse(req.body);
  const user = await prisma.user.findUnique({ where: { username : req.body.username } });
    if (!user) {
      return res.status(400).send('User not found');
    }
    //send email
  if (!success) {
    res.status(411).json({
      message: "Please check the correct inputs",
    });
  }
  try {
    const resetToken = jwt.sign(
      { userId: user.id  },
      process.env.RESET_PASSWORD_SECRET as string,
      { expiresIn: "1h" }
    );
    res.send("Password reset email sent");
  } catch (error) {
    res.status(500).send('Error sending password reset email');
  }
});

app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET as string) as { userId: number };
      await prisma.user.update({ where: { id: decoded.userId }, data: { password: newPassword } });
      res.send('Password reset successful');
    } catch (error) {
      res.status(500).send('Error resetting password');
    }
  });

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.userId },
      select: { username: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).send("Error fetching user profile");
  }
});

app.listen(PORT, () => {
  console.log(`app listening on $ {PORT}`);
});
