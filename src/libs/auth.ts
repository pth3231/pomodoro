import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        algorithm: "HS256",
        expiresIn: `10Mins`, // 10 mins
    };

    return jwt.sign(
        payload,
        secret_key,
        options
    );
}