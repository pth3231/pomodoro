import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { AccountModel } from "@/models/account.model";

dotenv.config();

export function generateAccessToken(username: string): string {
    if (!process.env.JWT_SECRET) {
        throw new Error("Empty secret key. Invalid");
    }
    const payload: Object = {
        username
    };
    const secret_key: string = process.env.JWT_SECRET as string;
    const options: jwt.SignOptions = {
        jwtid: crypto.randomUUID(),
        algorithm: "HS256",
        expiresIn: `10Mins`, // 10 mins
    };

    return jwt.sign(
        payload,
        secret_key,
        options
    );
}

export async function retrieveAccountFromDatabase(username: string) {
    const conn_uri = process.env.MONGODB_CONN_URI as string;
    console.info(conn_uri);
    // Init a connection in the connection pool
    await mongoose.connect(conn_uri);

    // Find matched username
    const account = await AccountModel.findOne({ username: username });
    console.info(account);
    return account;
}