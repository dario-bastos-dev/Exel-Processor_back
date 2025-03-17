import type { CellValue } from 'exceljs';

export interface File {
	id: string;
	name: string;
	path: string;
	createdAt: Date;
}

export interface SearchCriteria {
	column: string;
	value: string;
}

export type SearchResponse = CellValue[] | { [key: string]: CellValue };
