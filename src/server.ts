import cors from 'cors';
import express from 'express';
import fileRouter from './routes/files/router';
import userRouter from './routes/users/routes';
import path from 'path';
import fs from 'fs';

const app = express();

const uploadDir = path.join(process.cwd(), 'src/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(userRouter);
app.use(fileRouter);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
