import { type Response, type Request, type CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import { generateAccessToken, retrieveAccountFromDatabase } from '@/libs/auth';

async function validateAccount(req: Request, res: Response) {
    console.log(req.body);
    // Parse body
    const parsed_username = req.body.username;
    const parsed_password = req.body.password;
    try {
        if (!parsed_username || !parsed_password) {
            throw new Error("Unable to parse body");
        }

        if (!process.env.MONGODB_CONN_URI) {
            throw new Error("Mongoose URI is empty");
        }

        const account = await retrieveAccountFromDatabase(parsed_username);
        if (!account) {
            throw new Error("Credential not exist");
        }

        // Send respond
        const is_matched = await bcrypt.compare(parsed_password, account?.password as string);
        if (!is_matched) {
            throw new Error("Unmatched credential");
        }

        // Redirect to home
        // TODO: send a cookie containing JWT to the client
        const token = generateAccessToken(parsed_username);
            
        const options: CookieOptions = {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            path: "/",
            maxAge: 10 * 60 * 1000 // 10 mins
        };
    
        res.cookie("jwt", token, options);

        res.sendStatus(200);
    } catch (e) {
        if (e instanceof Error) {
            console.error(e);
            res.status(401).json({
                message: e.message
            });
        } else {
            res.status(403).json({
                message: "Unexpected error"
            });
        }
    }
}

export default {
    validateAccount
}