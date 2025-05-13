import type { Request, Response } from 'express';
import ExelService from '../services/file-service';
import type { FileController } from '../types/sheet';

export default class ExelController implements FileController {
	public async uploadFile(req: Request, res: Response): Promise<void> {
		const exelService = new ExelService();
		const file = req.file;

		const { id } = req.params;
		if (file === undefined) {
			Response.json({ error: 'No file uploaded' }, { status: 400 });
			return;
		}
		if (id === undefined) {
			Response.json({ error: 'No user informed' }, { status: 400 });
			return;
		}

		const { filename, path } = file;

		const { response } = await exelService.uploadFile(filename, path, id);

		res.json(response);
	}

	public async getExcel(req: Request, res: Response) {
		const exelService = new ExelService();
		const { id } = req.params;
		if (!id) {
			Response.json({ error: 'No file uploaded' }, { status: 400 });
			return;
		}

		const { response } = await exelService.getExcelFiles(id);

		res.json(response);
	}

	public async getSearchExcelFile(req: Request, res: Response) {
		const exelService = new ExelService();
		const { id } = req.params;

		if (!id) {
			Response.json({ error: 'Usuário não encontrado' }, { status: 400 });
			return;
		}
		const { fileId, columnIndex, searchValues } = req.body;

		const { response, status } = await exelService.searchExcelFile(
			fileId,
			columnIndex,
			searchValues,
		);

		res.status(status).json(response);
	}

	public async getFileHeaders(req: Request, res: Response) {
		const exelService = new ExelService();
		const { id, file } = req.params;

		if (!id) {
			Response.json({ error: 'Sem usuário especificado' }, { status: 400 });
			return;
		} else if (!file) {
			Response.json({ error: 'Sem arquivo especificado' }, { status: 400 });
			return;
		}

		const { response, status } = await exelService.getFileHeaders(id, file);

		res.status(status).json(response);
	}

	public async deleteFile(req: Request, res: Response) {
		const exelService = new ExelService();
		const { id } = req.params;

		if (!id) {
			Response.json({ error: 'No file uploaded' }, { status: 400 });
			return;
		}

		const { response, status } = await exelService.deleteFile(id);

		res.status(status).json(response);
	}
}
