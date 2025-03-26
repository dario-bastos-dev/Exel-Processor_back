import { Router } from 'express';
import upload from '../../configs/multer';
import ExelController from './controllers/file-controller';

const fileRouter = Router();

// File routes
const exelController: ExelController = new ExelController();

fileRouter.post(
	'/upload/:id',
	upload.single('file'),
	exelController.uploadFile,
);

fileRouter.get('/search', exelController.getSearchExcelFile);
fileRouter.get('/files', exelController.getExcel);
fileRouter.get('/headers', exelController.getFileHeaders);

fileRouter.delete('/files/:id', exelController.deleteFile);

export default fileRouter;
