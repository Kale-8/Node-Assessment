// User service
import {User} from "../models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

// List all users
export async function listUsers() {
    return User.findAll({
        attributes: {exclude: ["password"]},
    });
}

// Find user by ID
export async function findUserById(id: number) {
    const user = await User.findByPk(id, {
        attributes: {exclude: ["password"]},
    });
    if (!user) throw { status: 404, message: "User not found" };
    return user;
}

// Create user
export async function createUser(name: string, email: string, password: string, role: "admin" | "analyst") {
    const existing = await User.findOne({where: {email}});
    if (existing) throw { status: 409, message: "User with same email already exists" };
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({name, email, password: hashed, role} as any);
    return {id: user.id, name: user.name, email: user.email, role: user.role};
}

// Update user
export async function updateUser(id: number, data: {
    name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "analyst";
}) {
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: "User not found" };

    if (data.email && data.email !== user.email) {
        const existing = await User.findOne({where: {email: data.email}});
        if (existing) throw { status: 409, message: "Email already in use" };
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    await user.update(data);
    return {id: user.id, name: user.name, email: user.email, role: user.role};
}

// Delete user
export async function deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw { status: 404, message: "User not found" };
    await user.destroy();
}