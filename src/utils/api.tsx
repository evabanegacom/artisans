import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'https://fin-man.fly.dev/api/v1';
export const api: AxiosInstance = axios.create({
  baseURL: baseURL,
});

const token = localStorage.getItem('user');

// Request interceptor
api.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    // Modify the config as needed (e.g., add headers, authentication tokens, etc.)
    config.headers = config.headers || {
      Accept: "application/json",
    }; // Provide a default empty object for headers
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Handle response data
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle response error
    return Promise.reject(error);
  }
);

export const submitFormData = async (formData: FormData, endpoint:string) => {
  try {
    const response = await api.post(`${baseURL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle success if needed
    console.log('Success:', response?.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error:', error);
    throw error;
  }
};
