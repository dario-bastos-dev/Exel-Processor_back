import type { FileSheet } from '../../files/types/sheet';
import type { ResponseReq } from '../../types/types';

export type User = {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

type Data = Omit<User, 'password'>;
export type DataUser = Omit<Data, 'excelFiles'>;

export type UserResponse = ResponseReq<DataUser, FileSheet[]>;
