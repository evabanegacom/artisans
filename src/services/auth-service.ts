import { submitFormData, api, updateFormData } from '../utils/api';

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

const resetPassword = async (token:string) => {
    const response = await api.get(`/password/reset/${token}`)
    return response
}

const becomeASeller = async (store_name:string, id:number) => {
    const response = await api.put(`/users/${id}`, { store_name, seller: true })
    return response?.data
}

const getUser = async(id: number) => {
    const response = await api.get(`users/${id}`)
    return response?.data
}

const updateUserInfo = async (data: any, id: number) => {
    const response = await updateFormData(data, `users/${id}`);
    return response
}

const AuthService = {
    createAccount,
    login,
    forgotPassword,
    updatePassword,
    generateActivationLink,
    activateAccount,
    resetPassword,
    becomeASeller,
    getUser,
    updateUserInfo
}

export default AuthService;