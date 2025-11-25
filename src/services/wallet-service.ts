import { api } from '../utils/api';

  const fetchWallet = async () => {
    const response = await api.get('/wallet');
    return response?.data;
  }

  const verifyAccountNumber = async (accountNumber: string, bankCode: string) => {
    const response = await api.post('/users/verify_bank',  accountNumber, bankCode)
    return response?.data;
  }

  const saveBankDetails = async (accountNumber: string, bankCode: string, accountName: string) => {
    const response = await api.post('/update_bank', {
      account_number: accountNumber,
      bank_code: bankCode,
      account_name: accountName
    })

    return response?.data;
  }

  const banks = async () => {
    const response = await api.get('/paystack/banks');
    return response?.data;
  }

  const withdraw = async (amount: string) => {
    const response = await api.post('/withdraw', { amount });
    return response?.data;
  }

const WalletService = {
    fetchWallet,
    verifyAccountNumber,
    saveBankDetails,
    banks,
    withdraw
}

export default WalletService;
