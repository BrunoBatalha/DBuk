import { axiosClient } from '../axios/axios-client';

export class HttpClient {
	async post<TReponse>(url: string, body?: object): Promise<TReponse> {
		return await axiosClient.post(url, body || {});
	}

	async get<TReponse>(url: string, params?: object): Promise<TReponse> {
		try {
			return (await axiosClient.get(url, { params: params })).data;
		} catch (error) {
			console.error(error);
		}
	}
}