import type { CellValue } from 'exceljs';
import type { Request, Response } from 'express';

// Interface de retorno da função
type Return<T> = { data: null; error: string[] } | { data: T; error: null };

// Interface modelo da resposta da requisição
type ResponseReq<T> = {
	status: string;
	message: string;
	data: T | null;
	header?: string[];
	error: { code: number; details: string[] } | null;
};

// Interface da planilha
export interface FileSheet {
	id: string;
	name: string;
	path: string;
	createdAt: Date;
}

// Interfaces/Types de resposta da requisição
export type SearchResponse = CellValue[] | { [key: string]: CellValue };

export interface FileResponse extends ResponseReq<FileSheet> {}
export interface AllFilesResponse extends ResponseReq<FileSheet[]> {}
export interface SearchFileResponse extends ResponseReq<any[][]> {}
export interface HeadersFileResponse extends ResponseReq<SearchResponse> {}

// Interface do modelo
export interface FileModel {
	uploadFile(filename: string, path: string): Promise<Return<FileSheet>>;
	searchExcelFile(fileId: string): Promise<Return<FileSheet>>;
	getExelFiles(): Promise<Return<FileSheet[]>>;
	getFileHeaders(id: string): Promise<Return<FileSheet>>;
	deleteFile(id: string): Promise<Return<FileSheet>>;
}

// Interface do serviço
interface ResponseService<T> {
	response: T;
	status: number;
}
export interface FileService {
	uploadFile(
		filename: string,
		path: string,
	): Promise<ResponseService<FileResponse>>;
	searchExcelFile(
		fileId: string,
		columnIndex: number,
		searchValues: string[],
	): Promise<ResponseService<SearchFileResponse>>;
	getExcelFiles(): Promise<ResponseService<AllFilesResponse>>;
	getFileHeaders(id: string): Promise<ResponseService<HeadersFileResponse>>;
	deleteFile(id: string): Promise<ResponseService<FileResponse>>;
}

// Interface do controller
export interface FileController {
	uploadFile(req: Request, res: Response): Promise<void>;
	getExcel(req: Request, res: Response): Promise<void>;
	getSearchExcelFile(req: Request, res: Response): Promise<void>;
	getFileHeaders(req: Request, res: Response): Promise<void>;
	deleteFile(req: Request, res: Response): Promise<void>;
}
