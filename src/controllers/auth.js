import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();
import { signupSchema } from "../schemas/auth";
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        user.password = undefined;
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
        return res.status(201).json({
            message: "Đăng ký thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};