import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:5000'
});

export class HttpClientAdapter {
	async post<TReponse>(url: string, body?: object): Promise<TReponse> {
		return await axiosClient.post(url, body || {});
	}

	async get<TReponse>(url: string, params?: object): Promise<TReponse> {
		try {
			return (await axiosClient.get(url, { params: params })).data;
		} catch (error) {
			throw error;
		}
	}
}
