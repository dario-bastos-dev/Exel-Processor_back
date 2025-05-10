import { Router } from 'express';
import upload from '../../configs/multer';
import { authMiddleware } from '../../middlewares/auth';
import ExelController from './controllers/file-controller';

const fileRouter = Router();

// File routes
const exelController: ExelController = new ExelController();

fileRouter.post(
	'/upload/:id',
	upload.single('file'),
	exelController.uploadFile,
);

fileRouter.get('/search', authMiddleware, exelController.getSearchExcelFile);
fileRouter.get('/files', authMiddleware, exelController.getExcel);
fileRouter.get('/headers', authMiddleware, exelController.getFileHeaders);

fileRouter.delete('/files/:id', authMiddleware, exelController.deleteFile);

export default fileRouter;
