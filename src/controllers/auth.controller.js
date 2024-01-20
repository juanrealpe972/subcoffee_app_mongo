import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(["The email already exists"])

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id })
        // return json web token
        res.cookie('token', token);

        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email })
        if (!userFound)
            return res.status(400).json(["The email does not exist"])

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect password"
            })

        const token = await createAccessToken({ id: userFound._id })

        res.cookie("token", token)

        // return json web token
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    res.send('login')
};

export const userVerifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}