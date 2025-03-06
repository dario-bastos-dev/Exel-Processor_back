// server/server.ts
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import * as fileController from './controllers/exel-controller';
import upload from './configs/multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: '*', // Permitir requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Headers permitidos
  credentials: true // Permitir cookies
}));

// Servir arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/upload', upload.single('file'), fileController.uploadFile);
app.post('/search', fileController.searchExcelFile);
app.get('/files', fileController.getExcelFiles);
app.get('/files/:id/headers', fileController.getFileHeaders);
app.delete('/files/:id', fileController.deleteFile);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));