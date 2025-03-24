import cors from 'cors';
import express from 'express';
import router from './router';

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

app.use(router);

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});
