// Auth service
import {User} from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) throw { status: 500, message: 'JWT_SECRET is not defined' };
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

// Register user
export async function registerUser(name: string, email: string, password: string, role: "admin" | "analyst") {
    const existing = await User.findOne({where: {email}});
    if (existing) throw { status: 409, message: "User already exists" };
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({name, email, password: hashed, role} as any);
    return {id: user.id, name: user.name, email: user.email, role: user.role};
}

// Login user
export async function loginUser(email: string, password: string) {
    const user = await User.findOne({where: {email}});
    if (!user) throw { status: 401, message: "Invalid credentials" };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, message: "Invalid credentials" };
    // @ts-ignore
    const token = jwt.sign({
        sub: user.id,
        role: user.role,
        email: user.email
    }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return {token, user: {id: user.id, name: user.name, email: user.email, role: user.role}};
}