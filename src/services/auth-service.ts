import { submitFormData, api } from '../utils/api';

const createAccount = async (formData:any) => {
    const response = await submitFormData(formData, 'users')
    return response
    }

const login = async (data:any) => {
    const response = await api.post('/sign_in', data)
    return response?.data;
    }

const forgotPassword = async (data:any) => {
    const response = await api.post('/password/reset', data)
    return response?.data;
    }

const  updatePassword = async (data:any) => {
    const response = await api.put('/password/update', data)
    return response?.data;
}

const generateActivationLink = async (email:string) => {
    const response = await api.post('/generate_activation_token', { email })
    return response?.data;
}

const activateAccount = async (token:string) => {
    const response = await api.post('/activate', {token} )
    return response
}

const AuthService = {
    createAccount,
    login,
    forgotPassword,
    updatePassword,
    generateActivationLink,
    activateAccount
}

export default AuthService;