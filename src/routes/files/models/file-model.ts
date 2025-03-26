import { Prisma } from '@prisma/client';
import prisma from '../configs/prisma';
import type { FileModel, FileSheet } from '../types/sheet';

export default class ExelModel implements FileModel {
	private _error: string[] = [];
	private _file: FileSheet | null = null;

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
		this._file = null;
		this._error = [];
	}

	// POST: Upload file
	public async uploadFile(filename: string, path: string, userId: string) {
		this.dataCleaning();

		if (filename == undefined || path == undefined || userId == undefined) {
			this._error.push('No file uploaded');
			return { data: null, error: this._error };
		}

		try {
			this._file = await prisma.excelFile.create({
				data: {
					name: filename,
					path,
					userId,
				},
			});

			if (this._file == undefined) {
				this._error.push('Error uploading file');
				return { data: null, error: this._error };
			}

			return { data: this._file, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// POST: search file
	public async searchExcelFile(fileId: string) {
		this.dataCleaning();

		try {
			this._file = await prisma.excelFile.findUnique({ where: { id: fileId } });

			if (this._file == undefined) {
				this._error.push('Arquivo não encontrado');
				return { data: null, error: this._error };
			}

			return { data: this._file, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// GET: All files
	public async getExelFiles() {
		this.dataCleaning();

		try {
			const files = await prisma.excelFile.findMany();

			if (files == undefined) {
				this._error.push('Error uploading file');
				return { data: null, error: this._error };
			}

			return { data: files, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// GET: File headers
	public async getFileHeaders(id: string) {
		this.dataCleaning();

		try {
			this._file = await prisma.excelFile.findUnique({ where: { id } });

			if (this._file == undefined) {
				this._error.push('File not found');
				return { data: null, error: this._error };
			}

			return { data: this._file, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}

	// DELETE: File
	public async deleteFile(id: string) {
		this.dataCleaning();

		try {
			this._file = await prisma.excelFile.delete({ where: { id } });

			if (this._file == undefined) {
				this._error.push('File not found');
				return { data: null, error: this._error };
			}

			return { data: this._file, error: null };
		} catch (error: unknown) {
			return this.emmiterError(error);
		}
	}
}
