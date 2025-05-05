import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new Error(401, "Access token is required!")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if (!user) {
            throw new Error("Invalid access Token!")
        }
    
        req.user = user
        next()
    } catch (error) {
        return res.status(404).json({ message: error?.message ||'Invalid Token' });
    }
}

export default verifyJWT;