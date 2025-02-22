import { AxiosInstance } from 'axios';

export const getUsers = async (axiosInstance: AxiosInstance) => {
    try {
        const response = await axiosInstance.get('/users'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
