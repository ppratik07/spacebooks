"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reserveSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.reserveSchema = zod_1.default.object({
    seatId: zod_1.default.number(),
    date: zod_1.default.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
