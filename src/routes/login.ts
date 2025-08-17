import express from 'express';
import LoginController from '@/controllers/login.controller'
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post("/", LoginController.validateAccount);

export default router;