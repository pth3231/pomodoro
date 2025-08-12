import { type Response, type Request } from 'express';
import { AccountModel } from "@/models/account.model";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function registerAccount(req: Request, res: Response) {
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

        await mongoose.connect(process.env.MONGODB_CONN_URI as string);

        const overlap_account = await AccountModel.findOne({ username: parsed_username });
        if (overlap_account) {
            throw new Error("Duplicated credentials");
        }

        const salt_rounds = 13;
        const salt = await bcrypt.genSalt(salt_rounds);
        const hashed = await bcrypt.hash(parsed_password, salt);
        const new_account = new AccountModel({
            username: parsed_username,
            password: hashed
        });

        await new_account.save();

        console.log("Finished sign up process!");
        res.status(200).redirect("/login");
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
    registerAccount
};