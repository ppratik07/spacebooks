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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const Register_1 = require("./zod/Register");
const auth_1 = __importDefault(require("./middlewares/auth"));
const ResetPassword_1 = require("./zod/ResetPassword");
const DateSchema_1 = require("./zod/DateSchema");
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(cors());
app.use(express_1.default.json());
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
//Endpoints
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parsedInput = Register_1.register.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            message: "Please send correct inputs",
        });
    }
    const username = (_a = parsedInput.data) === null || _a === void 0 ? void 0 : _a.username;
    const password = (_b = parsedInput.data) === null || _b === void 0 ? void 0 : _b.password;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUser) {
            res.status(400).json({ error: "email is already registered" });
        }
        const newUser = yield prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
            },
        });
        const token = yield jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "User created successfully",
            jwt: token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const getUser = yield prisma.user.findUnique({
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
    const token = yield jwt.sign({ userid: getUser === null || getUser === void 0 ? void 0 : getUser.id }, process.env.JWT_SECRET);
    return res.status(200).json({
        message: "User signed in successfully",
        token,
    });
}));
app.get("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = ResetPassword_1.resetpassword.safeParse(req.body);
    const user = yield prisma.user.findUnique({
        where: { username: req.body.username },
    });
    if (!user) {
        return res.status(400).send("User not found");
    }
    //send email
    if (!success) {
        res.status(411).json({
            message: "Please check the correct inputs",
        });
    }
    try {
        const resetToken = jwt.sign({ userId: user.id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "1h" });
        res.send("Password reset email sent");
    }
    catch (error) {
        res.status(500).send("Error sending password reset email");
    }
}));
app.post("/reset-password/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        yield prisma.user.update({
            where: { id: decoded.userId },
            data: { password: newPassword },
        });
        res.send("Password reset successful");
    }
    catch (error) {
        res.status(500).send("Error resetting password");
    }
}));
app.get("/profile", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { username: true },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).send("Error fetching user profile");
    }
}));
app.get("/seat-layout", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    const { success, data, error } = DateSchema_1.dateSchema.safeParse(queryParams);
    if (!success) {
        return res.status(400).json({ error: error.errors.map((e) => e.message) });
    }
    const { date } = data;
    try {
        const seats = yield prisma.seat.findMany({
            include: {
                reservations: {
                    where: {
                        date: new Date(date),
                    },
                },
            },
        });
        res.json(seats);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/api/reserve", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = (req as unknown as Request & { user: UserPayload }).user; 
        // console.log(user);
        // if (!user) {
        //   return res.status(401).send({ error: 'User not authenticated' });
        // }
        const userId = 1; // Extracted from the token
        const { seatId, date } = req.body;
        // Debugging information
        console.log('Received reservation request:', { seatId, date });
        console.log('Extracted user ID:', userId);
        // Check if the user exists in the database
        // const existingUser = await prisma.user.findUnique({
        //   where: { id: userId }
        // });
        // if (!existingUser) {
        //   return res.status(400).send({ error: 'Invalid user ID' });
        // }
        // const newReservations = [];
        const ISODateFormatted = new Date().toISOString();
        // for (const id of seatId) {
        //   const newReservation = await prisma.reservation.create({
        //     data: {
        //       userId,
        //       seatId: id,
        //       date: ISODateFormatted
        //     }
        //   });
        //   newReservations.push(newReservation);
        // }
        const newReservation = yield prisma.reservation.create({
            data: {
                userId: userId,
                seatId: seatId,
                date: ISODateFormatted
            }
        });
        res.status(200).send({ message: 'Seats reserved successfully', newReservation });
    }
    catch (error) {
        console.error('Error reserving seats', error);
        res.status(500).send({ error: 'Error reserving seats' });
    }
}));
app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});
