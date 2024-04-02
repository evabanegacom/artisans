import { api, submitFormData } from '../utils/api';

const createSaving = async (formData:any) => {
    const response = await submitFormData(formData, '/savings')
    return response.data;
    }

const getUserSavings = async () => {
    const response = await api.get('/savings')
    return response.data;
    }

const createFinancialSaving = async (id: number, data:any) => {
    const response = await api.post(`/savings/${id}/add_savings_budget`, data)
    return response.data;
}

const SavingsService = {
    createSaving,
    getUserSavings,
    createFinancialSaving
}

export default SavingsService;