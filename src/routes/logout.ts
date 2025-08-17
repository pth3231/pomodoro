import express from 'express';
import LogoutController from '@/controllers/logout.controller';

const router = express.Router();

router.post("/", LogoutController.invalidateAccount);

export default router;