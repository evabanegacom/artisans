import { api } from '../utils/api';


// const fetchWallet = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/v1/wallet', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

  const fetchWallet = async () => {
    const response = await api.get('/wallet');
    return response?.data;
  }

const WalletService = {
    fetchWallet
}

export default WalletService;
