export interface IHttpClientAdapter {
	post<TReponse>(url: string, body?: object): Promise<TReponse>;
	get<TReponse>(url: string, params?: object): Promise<TReponse>;
}
