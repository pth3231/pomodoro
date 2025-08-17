import { type Response, type Request, type CookieOptions } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createClient } from 'redis';

dotenv.config();

async function invalidateAccount(req: Request, res: Response) {
    try {
        // Add JWI (UUID) to the blacklist
        const token = req.signedCookies["jwt"];
        console.log("[logout.controller] Token:", token);
        jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, payload: any) => {
            console.log(payload);

            const options: CookieOptions = {
                httpOnly: true,
                signed: true,
                sameSite: 'strict',
                path: "/"
            };
    
            // Clear cookie
            res.clearCookie("jwt", options);
            console.log("[logout.controller] Received payload:", payload)
            const current_time = Math.floor(Date.now() / 1000)
            const ttl = payload.exp - current_time;
            
            if (ttl > 0) {
                const client = createClient({
                    url: "redis://localhost:6379"
                });
                await client.connect();
                console.log("[logout.controller] Current time:", current_time)
                console.log("[logout.controller] TTL set:", ttl)
                const result = await client.set(`jwi-${payload.jti}`, "blacklisted", {
                    expiration: {
                        type: "EX",
                        value: ttl
                    }
                });
                console.log("[logout.controller] Result:", result);
                await client.close();
            }

            res.status(200).json({
                ok: 1
            }); 
        });
    } catch (e) {
        console.log(e);
        res.status(403);
    }
}

export default {
    invalidateAccount
}