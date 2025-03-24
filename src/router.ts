import { Router } from 'express';
import upload from './configs/multer';
import ExelController from './controllers/file-controller';

const router = Router();

const exelController: ExelController = new ExelController();

router.post('/upload', upload.single('file'), exelController.uploadFile);

router.get('/search', exelController.getSearchExcelFile);
router.get('/files', exelController.getExcel);
router.get('/headers', exelController.getFileHeaders);

router.delete('/files/:id', exelController.deleteFile);

export default router;
