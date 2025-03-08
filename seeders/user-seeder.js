import Profile from "../models/profile.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const userSeeder = async () => {
    try {
        const adminAlreadyExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (adminAlreadyExists) {
            console.log("Admin Already Seeded");
            return;
        }

        if (process.env.ADMIN_PASSWORD === undefined) {
            throw new Error("ADMIN_PASSWORD is not defined in the environment variables");
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, Number(process.env.SALT_ROUNDS));
        const user = await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        })

        await Profile.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            user: user._id
        })

    } catch (error) {
        console.log(error)
    }
}

export default userSeeder;
