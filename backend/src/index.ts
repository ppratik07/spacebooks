import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { register } from "./zod/Register";
import { signin } from "./zod/Signin";
import authMiddleware from "./middlewares/auth";
import { resetpassword } from "./zod/ResetPassword";
import { dateSchema } from "./zod/DateSchema";
import crypto from "crypto";
import { reserveSchema } from "./zod/reserveSchema";
import { UserPayload } from "./models/UserPayload";
const cors = require("cors");
const app = express();
import nodemailer from "nodemailer";

const PORT = 3000;

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex"); // Generate a 6-character OTP
};

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    to: email,
    from: "no-reply@example.com",
    subject: subject,
    html: html,
  });
};
//Endpoints
app.post("/signup", async (req, res) => {
  const parsedInput = register.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      message: "Please send correct inputs",
    });
  }
  const username = parsedInput.data?.username;
  const password = parsedInput.data?.password;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      res.status(400).json({ error: "email is already registered" });
    }
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
      },
    });
    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "User created successfully",
      jwt: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const getUser = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
  });
  if (!getUser) {
    res.status(403).send({
      message: "user not found/Incorrect credentials",
    });
  }
  const token = await jwt.sign({ userid: getUser?.id }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "User signed in successfully",
    token,
  });
});

app.post("/api/request-otp", async (req, res) => {
  const { success } = resetpassword.safeParse(req.body);
  const { email } = req.body;
  try {
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 3600000); // OTP valid for 1 hour

    await prisma.user.update({
      where: {
        username: email,
      },
      data: {
        otp,
        otpExpiresAt,
      },
    });

    const html = `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`;
    await sendEmail(email, "Password Reset OTP", html);

    res.status(200).send("OTP sent to email");
  } catch (error) {
    console.error("Error sending OTP email", error);
    res.status(500).send("Error sending OTP email");
  }
});

//Not in use
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(
      token,
      process.env.RESET_PASSWORD_SECRET as string
    ) as { userId: number };
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: newPassword },
    });
    res.send("Password reset successful");
  } catch (error) {
    res.status(500).send("Error resetting password");
  }
});

app.post("/reset-password", async(req, res) => {
  const { email, otp, newPassword } = req.body;
  try{
    const user = await prisma.user.findFirst({
      where:{
        username : email,
        otp,
        otpExpiresAt:{
          gt: new Date(), 
        },
      },
    });
    if(!user){
      res.status(400).send("Invalid or expired OTP");
    }
    await prisma.user.update({
      where:{id: user?.id},
      data:{
        password : newPassword,
        otp : null,
        otpExpiresAt : null
      },
    });
      res.status(200).send("Password reset successfully !");
  }
  catch(err){
    console.log("Error resetting the password",err);
    res.status(500).send('Error resetting the password');
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

app.get("/seat-layout", authMiddleware, async (req, res) => {
  const queryParams = req.query as { date?: string };
  const { success, data, error } = dateSchema.safeParse(queryParams);

  if (!success) {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
  const { date } = data;
  try {
    const seats = await prisma.seat.findMany({
      include: {
        reservations: {
          where: {
            date: new Date(date),
          },
        },
      },
    });

    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/seats", async (req, res) => {
  const selectedDate = req.query.date as string;
  console.log(selectedDate);
  if (!selectedDate) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const date = new Date(selectedDate);
    const reservations = await prisma.reservation.findMany({
      where: {
        date: date,
      },
      include: {
        seat: true,
      },
    });

    const seats = await prisma.seat.findMany();

    const seatStatus = seats.map((seat) => {
      const reserved = reservations.find(
        (reservation) => reservation.seatId === seat.id
      );
      return {
        id: seat.id,
        label: seat.label,
        x: seat.x,
        y: seat.y,
        status: reserved ? "reserved" : "available",
      };
    });

    res.status(200).json(seatStatus);
  } catch (error) {
    console.error("Error fetching seats", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/reserve", async (req, res) => {
  const { seatId, date } = req.body;
  const userId = 1; // take the userId from your context| currently harcoded

  console.log("Received reservation request:", { seatId, date });
  console.log("Extracted user ID:", userId);

  const seatExists = await prisma.seat.findUnique({
    where: {
      id: seatId,
    },
  });

  if (!seatExists) {
    console.log("Invalid seatId. Seat does not exist.");
    return res
      .status(400)
      .json({ error: "Invalid seatId. Seat does not exist." });
  }
  const dateObj = new Date(date);
  const ISODateFormatted = dateObj.toISOString();

  try {
    const newReservation = await prisma.reservation.create({
      data: {
        userId: userId,
        seatId: seatId,
        date: ISODateFormatted,
      },
    });
    res
      .status(200)
      .send({ message: "Seats reserved successfully", newReservation });
  } catch (error) {
    console.error("Error reserving seats", error);
    res.status(500).send({ error: "Error reserving seats" });
  }
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
