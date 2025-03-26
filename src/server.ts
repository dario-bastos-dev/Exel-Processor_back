import cors from 'cors';
import express from 'express';
import fileRouter from './routes/files/router';
import userRouter from './routes/users/routes';

const app = express();

app.use(express.json());

// Configurar CORS
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use(userRouter);
app.use(fileRouter);

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});
