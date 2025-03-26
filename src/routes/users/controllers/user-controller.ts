import type { Request, Response } from 'express';
import UserService from '../services/user-service';

export default class UserController {
	private userService: UserService = new UserService();

	public async createUser(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const { response, status } = await this.userService.createUser(
			name,
			email,
			password,
		);
		res.status(status).json(response);
	}

	public async loginUser(req: Request, res: Response) {
		const { email, password } = req.body;
		const { response, status } = await this.userService.loginUser(
			email,
			password,
		);
		res.status(status).json(response);
	}

	public async getUser(req: Request, res: Response) {
		const { id } = req.params;

		if (id === undefined) {
			res.status(404).json({
				status: 'error',
				message: 'Missing data',
				data: null,
				error: {
					code: 404,
					details: 'Missing data',
				},
			});
			return;
		}

		const { response, status } = await this.userService.getUser(id);
		res.status(status).json(response);
	}

	public async deleteUser(req: Request, res: Response) {
		const { id } = req.params;

		if (id === undefined) {
			res.status(404).json({
				status: 'error',
				message: 'Missing data',
				data: null,
				error: {
					code: 404,
					details: 'Missing data',
				},
			});
			return;
		}

		const { response, status } = await this.userService.deleteUser(id);
		res.status(status).json(response);
	}
}
