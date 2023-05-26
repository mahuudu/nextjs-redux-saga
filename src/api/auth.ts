import { Login , Register } from "../models";
import axiosClient from "./config";

const prefixLogin = '/auth'

export const authAPI = {
  login(payload: Login) {
    return axiosClient.post(`${prefixLogin}/login`, payload);
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
