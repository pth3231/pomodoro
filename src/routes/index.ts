import express from 'express';

import LoginRoutes from '@/routes/login';
import SignupRoutes from '@/routes/signup';
import AccountRoutes from '@/routes/account';
import LogoutRoutes from '@/routes/logout';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the API root!');
});

router.use('/login', LoginRoutes);
router.use('/signup', SignupRoutes);
router.use('/account', AccountRoutes);
router.use('/logout', LogoutRoutes);

export default router;