import { Login , Register } from "../models";
import axiosClient from "./config";

const prefixLogin = '/auth'

export const authAPI = {
  login(payload: Login) {
    try {
      const res = axiosClient.post(`${prefixLogin}/login`, payload);
      return res?.data;
    } catch (error) {
       throw error
    }
   
  },
  logout(payload: Login) {
    return axiosClient.post(`${prefixLogin}/logout`, payload);
  },
  getProfile(payload: Login) {
    return axiosClient.post(`${prefixLogin}/getProfile`, payload);
  },
  register(payload: Register) {
    return axiosClient.post(`${prefixLogin}/register`, payload);
  },
};
