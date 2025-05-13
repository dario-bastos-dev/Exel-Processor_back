import path from 'path';
import ExcelJS from 'exceljs';
import ExelModel from '../models/file-model';
import type {
	AllFilesResponse,
	FileResponse,
	FileService,
	HeadersFileResponse,
	SearchFileResponse,
	SearchResponse,
} from '../types/sheet';

export default class ExelService implements FileService {
	public async uploadFile(filename: string, path: string, userId: string) {
		const exelModel = new ExelModel();

		const { data, error } = await exelModel.uploadFile(filename, path, userId);

		let response: FileResponse;
		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar salvar a planilha',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return { response, status: 404 };
		}
		response = {
			status: 'success',
			message: 'Planilha salva com sucesso',
			data: {
				user: null,
				sheet: data,
			},
			error: null,
		};
		return { response, status: 200 };
	}

	public async getExcelFiles(id: string) {
		const exelModel = new ExelModel();
		const { data, error } = await exelModel.getExelFiles(id);

		let response: AllFilesResponse;
		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar as planilhas',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return { response, status: 404 };
		}

		response = {
			status: 'success',
			message: 'Planilhas encontradas com sucesso',
			data: {
				user: data.user,
				sheet: data.sheet,
			},
			error: null,
		};
		return { response, status: 200 };
	}

	public async searchExcelFile(
		fileId: string,
		columnIndex: number,
		searchValues: string[],
	) {
		const exelModel = new ExelModel();
		const { data: excelFile, error } = await exelModel.searchExcelFile(fileId);

		let response: SearchFileResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar as planilhas',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return { response, status: 404 };
		}

		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(path.resolve(excelFile.path));
		const worksheet = workbook.worksheets[0];

		const data: any[][] = [];

		if (worksheet == undefined) {
			response = {
				status: 'error',
				message: 'Planilha não encontrada',
				data: null,
				error: {
					code: 404,
					details: ['Planilha não encontrada'],
				},
			};
			return { response, status: 404 };
		}

		worksheet.eachRow((row, rowNumber) => {
			if (rowNumber !== 1) {
				const rowData: any[] = [];
				row.eachCell({ includeEmpty: true }, (cell) => rowData.push(cell.text));
				data.push(rowData);
			}
		});

		const searchResults = data.filter((row) => {
			const cellValue = row[columnIndex]?.toString().trim().toLowerCase();
			return searchValues.some(
				(searchValue: string) => cellValue === searchValue.trim().toLowerCase(),
			);
		});

		response = {
			status: 'success',
			message: 'Planilhas encontradas com sucesso',
			data: {
				user: null,
				sheet: searchResults,
			},
			error: null,
		};
		return { response, status: 200 };
	}

	public async getFileHeaders(id: string, file: string) {
		const exelModel = new ExelModel();

		if (!id) {
			const response: HeadersFileResponse = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar as planilhas',
				data: null,
				error: {
					code: 404,
					details: ['Usuario não encontrado'],
				},
			};
			return { response, status: 404 };
		}
		const { data: excelFile, error } = await exelModel.getFileHeaders(file);

		let response: HeadersFileResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar as planilhas',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return { response, status: 404 };
		}

		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(path.resolve(excelFile.path));
		const worksheet = workbook.worksheets[0];

		const headers: SearchResponse = [];

		if (worksheet == undefined) {
			response = {
				status: 'error',
				message: 'Planilha não encontrada',
				data: null,
				error: {
					code: 404,
					details: ['Planilha não encontrada'],
				},
			};
			return { response, status: 404 };
		}

		const rowValues = worksheet.getRow(1).values;
		headers.push(...(Array.isArray(rowValues) ? rowValues.slice(1) : []));

		response = {
			status: 'success',
			message: 'Cabeçalhos encontrados com sucesso',
			data: {
				user: null,
				sheet: null,
			},
			header: headers,
			error: null,
		};
		return { response, status: 200 };
	}

	public async deleteFile(id: string) {
		const exelModel = new ExelModel();
		const { data, error } = await exelModel.deleteFile(id);

		let response: FileResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar deletar a planilha',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return { response, status: 404 };
		}

		response = {
			status: 'success',
			message: 'Planilha deletada com sucesso',
			data: {
				user: null,
				sheet: data,
			},
			error: null,
		};
		return { response, status: 200 };
	}
}
