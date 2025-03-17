import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { processExcelFile } from '../services/exel-process';

const prisma = new PrismaClient();

export const uploadFile = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const file = req.file;
		if (!file) {
			res.status(400).json({ error: 'No file uploaded' });
			return;
		}

		const { filename, path } = file;
		const newFile = await prisma.excelFile.create({
			data: {
				name: filename,
				path: path,
			},
		});

		res.status(201).json(newFile);
	} catch (error: unknown) {
		res.status(500).json({ mensage: 'Error uploading file', error });
	}
};

export const searchExcelFile = async (req: Request, res: Response) => {
	try {
		const { fileId, columnIndex, searchValues } = req.body;

		const { headers, searchResults } = await processExcelFile(
			fileId,
			columnIndex,
			searchValues,
		);
		res.json({ headers, searchResults });
	} catch (error) {
		console.error('Error searching file:', error);
		res.status(500).json({ error: 'Error searching file' });
	}
};

export const getExcelFiles = async (_req: Request, res: Response) => {
	try {
		const files = await prisma.excelFile.findMany();
		res.json(files);
	} catch (error) {
		res.status(500).json({ mensage: 'Error fetching files', error });
	}
};

export const getFileHeaders = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const file = await prisma.excelFile.findUnique({ where: { id } });
		if (!file) {
			res.status(404).json({ error: 'File not found' });
			return;
		}

		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(file.path);
		const worksheet = workbook.worksheets[0];
		if (worksheet === undefined && worksheet === null) {
			res.status(404).json({ error: 'Worksheet not found' });
			return;
		}

		const rowValues = worksheet.getRow(1).values;
		const headers = Array.isArray(rowValues) ? rowValues.slice(1) : [];

		res.json(headers);
	} catch (error) {
		console.error('Error getting file headers:', error);
		res.status(500).json({ error: 'Error getting file headers' });
	}
};

export const deleteFile = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const file = await prisma.excelFile.findUnique({ where: { id } });

		if (!file) {
			res.status(404).json({ error: 'Arquivo não encontrado' });
			return;
		}

		// Deletar o arquivo do sistema de arquivos
		await fs.unlink(file.path);

		// Deletar o registro do banco de dados
		await prisma.excelFile.delete({ where: { id } });

		res.json({ message: 'Arquivo deletado com sucesso' });
	} catch (error) {
		console.error('Erro ao deletar arquivo:', error);
		res.status(500).json({ error: 'Erro ao deletar arquivo' });
	}
};
