import { submitFormData, api } from '../utils/api';

const createBudget = async (formData:any) => {
    const response = await submitFormData(formData, '/budgets')
    return response.data;
    }
    
const createBudgetExpense = async (data:any) => {
  const response = await api.post('/budgets/budget_expenses', data)
  return response.data;
}

const getUserBudgets = async (userId:number, pageNumber:number) => {
    const response = await api.get(`/budgets?user_id=${userId}&page=${pageNumber}`)
    return response.data;
}

//http://localhost:3001/api/v1/budgets/1/upcoming_budget_expense

const upcomingBudgets = async (id:number) => {
    const response = await api.get(`/budgets/${id}/upcoming_budget_expense`)
    return response.data;
    }

const getAggregates = async (id:number) => {
  const response = await api.get(`/monthly_savings?user_id=${id}`)
  return response.data
}

const deleteBudget = async (id:number) => {
  const response = await api.delete(`/budgets/delete_budget?id=${id}`)
  return response.data
}

const budget_expenses = async (id:number) => {
  const response = await api.get(`/budgets/budget_usage?id=${id}`)
  return response.data;
}

const BudgetService = {
    createBudget,
    createBudgetExpense,
    upcomingBudgets,
    getAggregates,
    getUserBudgets,
    deleteBudget,
    budget_expenses
}

export default BudgetService;