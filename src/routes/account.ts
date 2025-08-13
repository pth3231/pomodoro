import express from 'express';
import AccountController from '@/controllers/account.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';

const router = express.Router();

router.get("/", AccountController.handleGreet);

router.get("/basic-info", AuthMiddleware.authenticateAccessToken, AccountController.getBasicInfo);

export default router;