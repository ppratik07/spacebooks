import { Request, Response, NextFunction } from "express";
import { UserPayload } from '../models/UserPayload';
const { JWTSECRET }: any = process.env.JWT_SECRET ?? "secret";
const jwt = require("jsonwebtoken");

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWTSECRET);
    (req as any).user = decode as UserPayload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export default authMiddleware;