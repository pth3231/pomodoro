import express from 'express';

import LoginRoutes from '@/routes/login';
import SignupRoutes from '@/routes/signup';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the API root!');
});

router.use('/login', LoginRoutes);
router.use('/signup', SignupRoutes);

export default router;