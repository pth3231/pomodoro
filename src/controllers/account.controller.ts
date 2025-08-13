import { type Request, type Response } from 'express';

function handleGreet(req: Request, res: Response) {
    res.status(200).json({
        "message": "This is default /account route"
    });
}

function getBasicInfo(req: Request, res: Response) {
    res.status(200).json({
        user_info: req.authPayload?.decoded
    });
}

export default {
    handleGreet,
    getBasicInfo
}