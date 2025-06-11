import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config()

const protect = async (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        try {
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (dbErr) {
            return res.status(500).json({ message: "Database error" });
        }
    } catch (err) {
        // console.log(err)
        const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
        return res.status(401).json({ message });
    }
};

export default protect;