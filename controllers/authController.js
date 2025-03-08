import { prepareSuccessResponse } from "../helpers/response.js";
import Profile from "../models/profile.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        await Profile.create({
            name,
            email,
            user: user._id,
        });

        return res.status(201).json(prepareSuccessResponse(user, "User created successfully"));
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json(prepareSuccessResponse({ token, user }, "User logged in successfully"));
    }
    catch (error) {
        console.log(error);
    }
}

export default { register, login };