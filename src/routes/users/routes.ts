import { Router } from 'express';
import UserController from './controllers/user-controller';

const userRouter = Router();

// User routes
const userController: UserController = new UserController();

userRouter.post('/users', userController.createUser);
userRouter.post('/users/login', userController.loginUser);

userRouter.get('/users/:id', userController.getUser);

userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;
