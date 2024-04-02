import { api, submitFormData } from '../utils/api';

const createDebtMgt = async (formData:any) => {
    const response = await submitFormData(formData, 'debt_mgts')
    return response.data;
    }

const getUserDebts = async () => {
    const response = await api.get('/debt_mgts')
    return response.data;
    }

const createDebtPayment = async (id: number, data:any) => {
    const response = await api.post(`/debt_mgts/${id}/create_debt_payment`, data)
    return response.data;
}

const upcomingDebts = async (id:number) => {
    const response = await api.get(`/debt_mgts/${id}/upcoming_debt_payment`)
    return response?.data;
    }

const getDebtByUser = async (userId:number, pageNumber:number) => {
    //http://localhost:3001/budgets?user_id=your_user_id&page=1
    const response = await api.get(`/debt_mgts?user_id=${userId}&page=${pageNumber}`)
    return response.data;
}

const deleteDebt = async (id:number) => {
    const response = await api.delete(`/debt_mgts/delete_debtmgt?id=${id}`)
    return response.data;
}

const debtPayments = async (id:number) => {
    const response = await api.get(`/debt_mgts/debt_payments?id=${id}`)
    return response.data;
}

const DebtMgtsService = {
    createDebtMgt,
    getUserDebts,
    createDebtPayment,
    upcomingDebts,
    getDebtByUser,
    deleteDebt,
    debtPayments
}

export default DebtMgtsService;