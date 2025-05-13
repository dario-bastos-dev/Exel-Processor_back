import type { CellValue } from 'exceljs';
import type { Request, Response } from 'express';
import type { ResponseReq, ResponseService, Return } from '../../types/types';
import type { User } from '../../users/types/user';

// Interface da planilha
export type FileSheet = {
	id: string;
	name: string;
	path: string;
	createdAt: Date;
	updatedAt: Date;
};

// Interface de retorno da função
type ReturnFilesUser = {
	user: User;
	sheet: FileSheet[];
};

// Interfaces/Types de resposta da requisição
export type SearchResponse = CellValue[] | { [key: string]: CellValue };

export interface FileResponse extends ResponseReq<User, FileSheet> {}
export interface AllFilesResponse extends ResponseReq<User, FileSheet[]> {}
export interface SearchFileResponse extends ResponseReq<null, any[][]> {}
export interface HeadersFileResponse
	extends ResponseReq<null, SearchResponse> {}

// Interface do modelo
export interface FileModel {
	uploadFile(
		filename: string,
		path: string,
		userId: string,
	): Promise<Return<FileSheet>>;
	searchExcelFile(fileId: string): Promise<Return<FileSheet>>;
	getExelFiles(id: string): Promise<Return<ReturnFilesUser>>;
	getFileHeaders(id: string): Promise<Return<FileSheet>>;
	deleteFile(id: string): Promise<Return<FileSheet>>;
}
export interface FileService {
	uploadFile(
		filename: string,
		path: string,
		userId: string,
	): Promise<ResponseService<FileResponse>>;
	searchExcelFile(
		fileId: string,
		columnIndex: number,
		searchValues: string[],
	): Promise<ResponseService<SearchFileResponse>>;
	getExcelFiles(id: string): Promise<ResponseService<AllFilesResponse>>;
	getFileHeaders(
		id: string,
		file: string,
	): Promise<ResponseService<HeadersFileResponse>>;
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
