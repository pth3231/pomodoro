import express from 'express';
import SignupController from '@/controllers/signup.controller';

const router = express.Router();

router.post("/", SignupController.registerAccount);

export default router;