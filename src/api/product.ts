import axiosClient from "./config";

export const productAPI = {
    getAll(): Promise<any> {
        const url = '/products/list'
        return axiosClient.get(url);
    },
    getById(id: any): Promise<any> {
        const url = '/products/'
        return axiosClient.get(`${url}${id}`);
    },
    getSearch(params: any): Promise<any> {
        const url = '/products/'
        return axiosClient.get(url, { params });
    },
};
