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
const Signin_1 = require("./zod/Signin");
const auth_1 = __importDefault(require("./middlewares/auth"));
const ResetPassword_1 = require("./zod/ResetPassword");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
//Endpoints
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = Register_1.register.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Please send correct inputs",
        });
    }
    const user = yield prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
        },
    });
    const token = yield jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({
        message: "User created successfully",
        jwt: token,
    });
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = Signin_1.signin.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error signing in. Please check email and password!",
        });
    }
    const getUser = yield prisma.user.findUnique({
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
    const token = yield jwt.sign({ id: getUser === null || getUser === void 0 ? void 0 : getUser.id }, process.env.JWT_SECRET);
    return res.status(200).json({
        message: "User signed in successfully",
        jwt: token,
    });
}));
app.get("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = ResetPassword_1.resetpassword.safeParse(req.body);
    const user = yield prisma.user.findUnique({ where: { username: req.body.username } });
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
        const resetToken = jwt.sign({ userId: user.id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "1h" });
        res.send("Password reset email sent");
    }
    catch (error) {
        res.status(500).send('Error sending password reset email');
    }
}));
app.post('/reset-password/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        yield prisma.user.update({ where: { id: decoded.userId }, data: { password: newPassword } });
        res.send('Password reset successful');
    }
    catch (error) {
        res.status(500).send('Error resetting password');
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
app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});
