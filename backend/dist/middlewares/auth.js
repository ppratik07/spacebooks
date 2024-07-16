"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { JWTSECRET } = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token, JWTSECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid token.");
    }
};
exports.default = authMiddleware;
