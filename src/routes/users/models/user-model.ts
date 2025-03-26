import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../configs/prisma';
import type { User } from '../types/user';

export default class UserModel {
	private _error: string[] = [];
	private _user: User | null = null;

	// emmiter error
	private emmiterError(error: unknown): { data: null; error: string[] } {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case 'P2025':
					this._error.push('Usuário não encontrado');
					break;
				default:
					this._error.push(error.message);
					break;
			}
		}

		return { data: null, error: this._error };
	}

	// Data cleaning
	private dataCleaning() {
		this._user = null;
		this._error = [];
	}

	// POST: Create user
	public async createUser(name: string, email: string, password: string) {
		this.dataCleaning();

		if (!name || !email || !password) {
			this._error.push('Missing data');
			return { data: null, error: this._error };
		}

		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			this._user = await prisma.user.create({
				data: {
					name,
					email,
					password: hash,
				},
			});

			if (this._user == undefined) {
				this._error.push('Error creating user');
				return { data: null, error: this._error };
			}

			return { data: this._user, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// POST: Login user
	public async loginUser(email: string, password: string) {
		this.dataCleaning();

		if (!email || !password) {
			this._error.push('Missing data');
			return { data: null, error: this._error };
		}

		try {
			this._user = await prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (this._user == null) {
				this._error.push('User not found');
				return { data: null, error: this._error };
			}

			const isMatch = bcrypt.compareSync(password, this._user.password);

			if (isMatch == false) {
				this._error.push('Invalid password');
				return { data: null, error: this._error };
			}

			return { data: this._user, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// GET: Get user
	public async getUser(id: string) {
		this.dataCleaning();

		try {
			this._user = await prisma.user.findUnique({
				where: { id },
				include: { excelFiles: true },
			});

			if (this._user == undefined) {
				this._error.push('User not found');
				return { data: null, error: this._error };
			}

			return { data: this._user, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// DELETE: Delete user
	public async deleteUser(id: string) {
		this.dataCleaning();

		try {
			this._user = await prisma.user.delete({ where: { id } });

			if (this._user == undefined) {
				this._error.push('User not found');
				return { data: null, error: this._error };
			}

			return { data: this._user, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}
}
