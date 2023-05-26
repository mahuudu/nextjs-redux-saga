import axios from 'axios';
import { getCookie  } from 'cookies-next';
import { getSession } from 'next-auth/react';

const axiosClient = axios.create({
  baseURL: "http://localhost:6100/api/v1",
  headers: { "content-type": "application/json" },
});


// Add a request interceptor
axiosClient.interceptors.request.use(async function  (config) {
  // Do something before request is sent
  const session = await getSession();

  const sessionData: any | null | undefined = session;
  if (sessionData?.user?.user?.access_token) {
    config.headers.Authorization = `Bearer ${sessionData?.user?.user?.access_token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  console.log('error-inter', error)
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('error-inter', error)
  return Promise.reject(error);
});

export default axiosClient;