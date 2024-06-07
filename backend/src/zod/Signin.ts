import zod from "zod";

export const signin = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8)
})

module.exports ={
    signin
}