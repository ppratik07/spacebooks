import zod from "zod";

export const resetpassword = zod.object({
    username : zod.string().email()
})

module.exports = {
    resetpassword
}