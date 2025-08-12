import { type Response, type Request } from 'express';
import { AccountModel } from "@/models/account.model";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

        // Init a connection in the connection pool
        await mongoose.connect(process.env.MONGODB_CONN_URI as string);

        // Find matched username
        const account = await AccountModel.findOne({ username: parsed_username });
        console.log(account);

        // Send respond
        const is_matched = await bcrypt.compare(parsed_password, account?.password as string);
        if (!account || !is_matched) {
            throw new Error("Unmatched credential");
        }

        // Redirect to home
        res.status(200).redirect("/");
    } catch (e) {  
        if (e instanceof Error) {
            console.error(e);
            res.status(401).json({
                "message": e.message
            });
        } else {
            res.status(500).json({
                "message": "Unexpected error"
            });
        }
    }
}

export default {
    validateAccount
}