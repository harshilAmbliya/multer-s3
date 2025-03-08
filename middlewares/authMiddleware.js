import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";



// Hash password before saving user
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password during login
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
};

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });
    const tokenString = token?.replace("Bearer ", "");
    try {
        const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
        const verified = jwt.verify(tokenString, SECRET_KEY);
        let user = await User.findOne({ email: verified.email });
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Role-based access control
const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
};

export { hashPassword, comparePassword, generateToken, verifyToken, authorizeRole };
