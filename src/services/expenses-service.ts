import { submitFormData } from '../utils/api';

const createExpense = async (formData:any) => {
    const response = await submitFormData(formData, '/expenses')
    return response.data;
    }

const ExpenseService = {
    createExpense,
}

export default ExpenseService;