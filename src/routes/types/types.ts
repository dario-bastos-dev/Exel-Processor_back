// Interface de retorno da função
export type Return<T> =
	| { data: null; error: string[] }
	| { data: T; error: null };

type Data<U, S> = {
	user: U | null;
	sheet: S | null;
};
// Interface modelo da resposta da requisição
export type ResponseReq<U, S> = {
	status: string;
	message: string;
	data: Data<U, S> | null;
	header?: string[];
	token?: string;
	error: { code: number; details: string[] } | null;
};

// Interface do serviço
export interface ResponseService<T> {
	response: T;
	status: number;
}
