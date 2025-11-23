// src/pages/Wallet.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { format } from 'date-fns';
import { Banknote, Clock, ArrowDownToLine, Plus, CheckCircle } from 'lucide-react';
import WalletService from '@/services/wallet-service';
import { banks } from '@/banks';

interface WalletData {
  available_balance: number;
  pending_balance: number;
  pending_sales: Array<{
    id: number;
    amount: number;
    payable_at: string;
  }>;
  bank_details: {
    account_name?: string;
    account_number?: string;
    bank_name?: string;
  } | null;
}

export default function SellerWallet() {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBankModal, setShowBankModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [verifying, setVerifying] = useState(false);

  const token = localStorage.getItem('jwt_token');

  useEffect(() => {
    fetchWallet();
  }, []);

const fetchWallet = async  () => {
    try {
        const response = await WalletService.fetchWallet();
        console.log({response})
        setData(response);
    }catch (err) {
        console.error(err);
    }finally {
        setLoading(false);
    }
}

  const verifyAccount = async () => {
    if (!accountNumber || !bankCode || accountNumber.length < 10) return;
    setVerifying(true);
    try {
      const res = await axios.post('/api/v1/users/verify_bank', {
        account_number: accountNumber,
        bank_code: bankCode
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccountName(res.data.account_name);
    } catch (err: any) {
      alert(err.response?.data?.error || "Verification failed");
      setAccountName('');
    } finally {
      setVerifying(false);
    }
  };

  const saveBankDetails = async () => {
    try {
      await axios.post('/api/v1/users/update_bank', {
        account_number: accountNumber,
        bank_code: bankCode,
        account_name: accountName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Bank details saved!");
      setShowBankModal(false);
      fetchWallet();
    } catch (err) {
      alert("Failed to save bank details");
    }
  };

  const withdraw = async () => {
    const amt = parseFloat(amount);
    if (amt < 1000) return alert("Minimum withdrawal is ₦1,000");
    if (!data?.bank_details) return alert("Add your bank account first");

    if (confirm(`Withdraw ₦${amt.toLocaleString()}?`)) {
      try {
        await axios.post('/api/v1/withdraw', { amount: amt }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Withdrawal successful! Check your bank in 1-2 hours.");
        setAmount('');
        fetchWallet();
      } catch (err: any) {
        alert(err.response?.data?.error || "Withdrawal failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            My Wallet
          </h1>
          <p className="text-xl text-gray-600 mt-4">Your earnings, ready when you are</p>
        </motion.div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-lg">Available Balance</p>
                <p className="text-5xl font-black mt-4">
                  ₦{data?.available_balance?.toLocaleString() || '0'}
                </p>
              </div>
              <Banknote className="w-16 h-16 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-lg">Pending (24h hold)</p>
                <p className="text-5xl font-black mt-4">
                  ₦{data?.pending_balance?.toLocaleString() || '0'}
                </p>
              </div>
              <Clock className="w-16 h-16 opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Bank & Withdraw */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {data?.bank_details?.account_number ? (
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-600">Withdraw to</p>
                <p className="text-2xl font-bold">{data.bank_details.account_name}</p>
                <p className="text-gray-500">
                  {data.bank_details.bank_name} • {data.bank_details.account_number}
                </p>
              </div>
              <button
                onClick={() => setShowBankModal(true)}
                className="px-6 py-3 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Change Bank
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowBankModal(true)}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:shadow-xl transition flex items-center justify-center gap-3"
            >
              <Plus className="w-8 h-8" />
              Add Bank Account to Withdraw
            </button>
          )}

          {/* Withdraw Section */}
          {data?.bank_details && data.available_balance > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex gap-4 max-w-md">
                <input
                  type="number"
                  placeholder="Enter amount (min ₦1,000)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl text-xl font-medium focus:border-purple-500 outline-none"
                />
                <button
                  onClick={withdraw}
                  disabled={!amount || parseFloat(amount) < 1000 || parseFloat(amount) > data.available_balance}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 transition flex items-center gap-3"
                >
                  <ArrowDownToLine className="w-6 h-6" />
                  Withdraw
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Available: ₦{data.available_balance.toLocaleString()} • Minimum: ₦1,000
              </p>
            </div>
          )}
        </div>

        {/* Pending Sales */}
        {data?.pending_sales?.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Pending Payouts (24h hold)</h3>
            <div className="space-y-4">
              {data.pending_sales.map((sale) => {
                const hoursLeft = Math.max(0, Math.round((new Date(sale.payable_at).getTime() - Date.now()) / (1000 * 60 * 60)));
                return (
                  <motion.div
                    key={sale.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="text-2xl font-bold">₦{sale.amount.toLocaleString()}</p>
                      <p className="text-gray-500">Available in {hoursLeft} hours</p>
                    </div>
                    <Clock className="w-12 h-12 text-amber-500" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
          >
            <h2 className="text-3xl font-bold mb-6">Add Bank Account</h2>
            <div className="space-y-5">
              <select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg"
              >
                <option value="">Select Bank</option>
                {banks.map(b => (
                  <option key={b.code} value={b.code}>{b.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  if (e.target.value.length === 10) verifyAccount();
                }}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg"
              />

              <div className="p-4 bg-gray-50 rounded-2xl">
                {verifying && <p className="text-gray-600">Verifying...</p>}
                {accountName && (
                  <p className="text-green-600 font-bold flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    {accountName}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowBankModal(false)}
                  className="flex-1 py-4 bg-gray-200 rounded-2xl font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveBankDetails}
                  disabled={!accountName}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold disabled:from-gray-400 disabled:to-gray-500"
                >
                  Save Bank
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}