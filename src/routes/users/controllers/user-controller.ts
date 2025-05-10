import type { Request, Response } from 'express';
import UserService from '../services/user-service';

export default class UserController {
	public async createUser(req: Request, res: Response) {
		const service = new UserService();

		const { name, email, password } = req.body;
		const { response } = await service.createUser(name, email, password);

		res.json(response);
	}

	public async loginUser(req: Request, res: Response) {
		const service = new UserService();

		const { email, password } = req.body;
		const { response } = await service.loginUser(email, password);

		res.json(response);
	}

	public async getUser(req: Request, res: Response) {
		const service = new UserService();

		const { id } = req.params;

		if (id === undefined) {
			res.status(400).json({
				status: 'error',
				message: 'Missing data',
				data: null,
				error: {
					code: 400,
					details: 'Missing data',
				},
			});
			return;
		}

		const { response, status } = await service.getUser(id);
		res.status(status).json(response);
	}

	public async deleteUser(req: Request, res: Response) {
		const service = new UserService();

		const { id } = req.params;

		if (id === undefined) {
			res.status(400).json({
				status: 'error',
				message: 'Missing data',
				data: null,
				error: {
					code: 400,
					details: 'Missing data',
				},
			});
			return;
		}

		const { response, status } = await service.deleteUser(id);
		res.status(status).json(response);
	}
}
