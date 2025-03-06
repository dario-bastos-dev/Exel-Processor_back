import cors from 'cors';
// server/server.ts
import express from 'express';
import upload from './configs/multer';
import * as fileController from './controllers/exel-controller';
import ensureUploadDirectoryExists from './utils/create-diretory';

const app = express();

app.use(express.json());

// Configurar CORS
app.use(
	cors({
		origin: '*', // Permitir requisições do frontend
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
		allowedHeaders: ['Content-Type'], // Headers permitidos
		credentials: true, // Permitir cookies
	}),
);

ensureUploadDirectoryExists();

app.post('/upload', upload.single('file'), fileController.uploadFile);
app.post('/search', fileController.searchExcelFile);
app.get('/files', fileController.getExcelFiles);
app.get('/files/:id/headers', fileController.getFileHeaders);
app.delete('/files/:id', fileController.deleteFile);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
