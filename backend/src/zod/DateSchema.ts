import zod from "zod"

export const dateSchema = zod.object({
    date: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

module.exports = {
    dateSchema
}