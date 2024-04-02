import { api, submitFormData } from '../utils/api';

const createIncome = async (formData:any) => {
    const response = await submitFormData(formData, '/incomes')
    return response.data;
    }

const addIncome = async (data:any) => {
    const response = await api.post('/incomes/create_income_data', data)
    return response.data;
    }

const IncomeService = {
    createIncome,
    addIncome
}

export default IncomeService;