import zod from "zod";

export const reserveSchema  = zod.object({
    seatId : zod.number(),
    date : zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})