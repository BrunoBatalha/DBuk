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

	// async postFormData<TResponse>(url: string, body?: FormData) {
	// 	try {
	// 		// const response = await axiosClient.post(url, { data: body, }, {
	// 		// 	headers: {
	// 		// 		"Content-Type": "multipart/form-data"
	// 		// 	}
	// 		// });
	// 		const response = await axiosClient({
	// 			method: 'post',
	// 			url: 'http://192.168.0.37:5000/posts',
	// 			data: body,
	// 			headers: { 'Content-Type': 'multipart/form-data' }
	// 		});
	// 		console.log(response);
	// 		return response.data as TResponse;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
}
