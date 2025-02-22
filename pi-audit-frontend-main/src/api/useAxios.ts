'use client';
import { useMemo } from 'react';
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
interface ErrorResponse {
    message: string;
}
const useAxios = (): AxiosInstance => {
    const authToken = localStorage.getItem('token') || ''; 

    const axiosInstance: AxiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: API_BASE_URL,
            headers: { 'Content-Type': 'application/json' },
        });

        instance.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                if (authToken) {
                    request.headers.Authorization = `Bearer ${authToken}`;
                }
                return request;
            },
            (error) => Promise.reject(error)
        );

        instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    const errorMessage = (error.response?.data as ErrorResponse)?.message;

                    if (errorMessage === 'jwt expired') {
                        console.warn('Token expired, logging out...');
                    } else if (errorMessage?.includes('Authorization Error')) {
                        console.error('Authorization error, redirecting...');
                    }
                }

                return Promise.reject(error);
            }
        );

        return instance;
    }, [authToken]);

    return axiosInstance;
};

export default useAxios;

