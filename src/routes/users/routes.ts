import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import UserController from './controllers/user-controller';

const userRouter = Router();

// User routes
const userController = new UserController();

userRouter.post('/users/create', userController.createUser);
userRouter.post('/users/login', userController.loginUser);

userRouter.get('/users/:id', authMiddleware, userController.getUser);

userRouter.delete('/users/:id', authMiddleware, userController.deleteUser);

export default userRouter;
