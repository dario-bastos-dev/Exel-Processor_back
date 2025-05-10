import type { Request, Response } from 'express';
import ExelService from '../services/file-service';
import type { FileController } from '../types/sheet';

export default class ExelController implements FileController {
	public async uploadFile(req: Request, res: Response): Promise<void> {
		const exelService = new ExelService();
		const file = req.file;

		console.log('file:', file);

		const { userId } = req.params;
		if (file === undefined) {
			Response.json({ error: 'No file uploaded' }, { status: 400 });
			return;
		}
		if (userId === undefined) {
			Response.json({ error: 'No user informed' }, { status: 400 });
			return;
		}

		const { filename, path } = file;

		const { response, status } = await exelService.uploadFile(
			filename,
			path,
			userId,
		);

		res.status(status).json(response);
	}

	public async getExcel(_req: Request, res: Response) {
		const exelService = new ExelService();
		const { response, status } = await exelService.getExcelFiles();

		res.status(status).json(response);
	}

	public async getSearchExcelFile(req: Request, res: Response) {
		const exelService = new ExelService();
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
		const { id } = req.params;

		if (!id) {
			Response.json({ error: 'No file uploaded' }, { status: 400 });
			return;
		}

		const { response, status } = await exelService.getFileHeaders(id);

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
