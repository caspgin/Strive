import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => { });
authRouter.post('/signup', (req, res) => { });
authRouter.post('/logout', (req, res) => { });

export default authRouter;
