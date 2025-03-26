import type { FileSheet } from '../../files/types/sheet';
import type { ResponseReq } from '../../types/types';

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	excelFiles?: FileSheet[];
	createdAt: Date;
	updatedAt: Date;
}

type Data = Omit<User, 'password'>;
export type DataUser = Omit<Data, 'excelFiles'>;

export type UserResponse = ResponseReq<DataUser, FileSheet[]>;
