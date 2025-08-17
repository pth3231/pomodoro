import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';
import { createClient } from 'redis';

// import { IncomingHttpHeaders } from 'http';

dotenv.config();

function authenticateAccessToken(req: Request, res: Response, next: any) {
    if (!req.headers) {
        res.sendStatus(401);
    }

    // const auth_header = (req.headers as IncomingHttpHeaders)['authorization'];
    // const token = auth_header && auth_header.split(' ')[1];

    // Instead of checking the Authorization header, we directly validate the cookie
    const token = req.signedCookies["jwt"];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
        console.log("[auth.middleware] Error at auth.middleware:", err);

        if (err) 
            return res.sendStatus(403);

        console.log("[auth.middleware] Decoded data", decoded);

        const client = createClient();
        await client.connect();
        const result = await client.get(`jwi-${decoded.jti}`);
        if (result)
            return res.sendStatus(401);

        await client.close();

        req.authPayload = { decoded };
        next();
    });
}

export default {
    authenticateAccessToken
}