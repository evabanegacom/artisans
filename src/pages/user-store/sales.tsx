import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, TrendingUp, ShoppingBag, CheckCircle, 
  Clock, AlertCircle, ArrowUp, DollarSign, ChevronLeft, ChevronRight
} from 'lucide-react';
import ProductService from '@/services/product-service';

interface Sale {
  id: number;
  sale_id: string;
  status: string;
  created_at: string;
  downloaded_at: string | null;
  buyer_name: string;
  buyer_email: string;
  product_name: string;
  product_image: string;
  product_category: string;
  store_name: string;
  amount_formatted: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_sales: number;
  per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

interface Summary {
  total_revenue: string;
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
}

const Sales: React.FC = () => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const [sales, setSales] = useState<Sale[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchSales = async (pageNum: number = 1) => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await ProductService.sales(user.id, pageNum);
      setSales(data.sales);
      setSummary(data.summary);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(page);
  }, [user?.id, page]);

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: 'emerald', bg: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', icon: CheckCircle };
      case 'pending':
        return { color: 'amber', bg: 'bg-amber-100 text-amber-700', border: 'border-amber-200', icon: Clock };
      default:
        return { color: 'gray', bg: 'bg-gray-100 text-gray-600', border: 'border-gray-200', icon: AlertCircle };
    }
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-20 bg-white/60 backdrop-blur-xl rounded-3xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-white/70 backdrop-blur-xl rounded-3xl animate-pulse" />
            ))}
          </div>
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" />
            <div className="p-8 space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4 leading-tight">
            Sales Dashboard
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium">
            Welcome back, <span className="text-purple-600 font-bold">{user?.store_name || user?.name}</span>!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                className={`w-3 h-3 rounded-full ${
                  i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-pink-500' : i === 2 ? 'bg-blue-500' : 'bg-cyan-500'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Total Revenue", value: summary?.total_revenue || '₦0', icon: DollarSign, gradient: "from-purple-500 to-pink-500", trend: "+23%" },
            { label: "Total Orders", value: summary?.total_orders || 0, icon: ShoppingBag, gradient: "from-blue-500 to-cyan-500" },
            { label: "Completed", value: summary?.completed_orders || 0, icon: CheckCircle, gradient: "from-emerald-500 to-teal-500", trend: "+18%" },
            { label: "Pending", value: summary?.pending_orders || 0, icon: Clock, gradient: "from-amber-500 to-orange-500" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-70 group-hover:opacity-90 transition-all rounded-3xl blur-xl" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`, 
                              '--tw-gradient-from': stat.gradient.split(' ')[1], 
                              '--tw-gradient-to': stat.gradient.split(' ')[3] } as any} />
                
                <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/20 p-8 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {stat.trend && (
                      <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 mt-2">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sales Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
        >
          <div className="px-8 sm:px-10 py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            <h2 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-4">
              <Package className="w-12 h-12" />
              Recent Sales
            </h2>
          </div>

          {sales.length === 0 ? (
            <div className="p-16 sm:p-24 text-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <div className="relative">
                  <Package className="w-32 h-32 mx-auto text-purple-200" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -m-8 border-8 border-dashed border-purple-300 rounded-full opacity-30"
                  />
                </div>
              </motion.div>
              <h3 className="text-4xl font-bold text-gray-800 mt-10 mb-4">No sales yet</h3>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Your products are ready — your first sale is just around the corner!
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      {['Order', 'Product', 'Customer', 'Status', 'Date', 'Amount'].map((h) => (
                        <th key={h} className="px-6 sm:px-10 py-6 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
  <AnimatePresence mode="popLayout">
    {sales.map((sale, i) => {
      const config = getStatusConfig(sale.status);
      const Icon = config.icon;
      const isDownloaded = !!sale.downloaded_at;

      return (
        <motion.tr
          key={sale.id}
          layout
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/70 hover:to-pink-50/70 transition-all duration-300"
        >
          {/* Order + Product Image */}
          <td className="px-6 sm:px-10 py-8">
            <div className="flex items-center gap-6">
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <motion.div
                  whileHover={{ scale: 1.3, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <img
                    src={sale.product_image}
                    alt={sale.product_name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-2xl"
                  />
                  {i < 3 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      New
                    </div>
                  )}
                </motion.div>
              </div>
              {/* <div>
                <div className="text-xl font-bold text-gray-900">#{sale.sale_id}</div>
                <div className="text-sm text-purple-600 font-medium">{sale.store_name}</div>
              </div> */}
            </div>
          </td>

          {/* Product Name */}
          <td className="px-6 sm:px-10 py-8">
            <div className="font-semibold text-gray-900 text-lg">{sale.product_name}</div>
            <div className="text-sm text-gray-500 mt-1">{sale.product_category}</div>
          </td>

          {/* Customer */}
          <td className="px-6 sm:px-10 py-8">
            <div className="font-medium text-gray-900">{sale.buyer_name}</div>
            <div className="text-sm text-gray-500 truncate max-w-xs">{sale.buyer_email}</div>
          </td>

          {/* Status */}
          <td className="px-6 sm:px-10 py-8">
            <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold border-2 ${config.bg} ${config.border}`}>
              <Icon className="w-5 h-5" />
              {/* {config.label} */}
            </div>
          </td>

          {/* Date + Downloaded At (Modern WordPress Style) */}
          <td className="px-6 sm:px-10 py-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="font-semibold text-gray-900">
                  {format(new Date(sale.created_at), 'MMM d, yyyy')}
                </span>
              </div>
              {isDownloaded && (
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">
                    Downloaded {format(new Date(sale.downloaded_at!), 'h:mm a')}
                  </span>
                </div>
              )}
            </div>
          </td>

          {/* Amount */}
          <td className="px-6 sm:px-10 py-8">
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              {sale.amount_formatted}
            </div>
            {sale.status.toLowerCase() === 'completed' && (
              <div className="text-xs text-emerald-600 font-semibold mt-1">Paid</div>
            )}
          </td>
        </motion.tr>
      );
    })}
  </AnimatePresence>
</tbody>
                </table>
              </div>

              {/* Enhanced Pagination */}
              {pagination && pagination.total_pages > 1 && (
                <div className="px-6 sm:px-10 py-8 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-t-2 border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-gray-700 font-medium">
                    Showing <span className="font-bold text-purple-600">
                      {(pagination.current_page - 1) * pagination.per_page + 1}
                    </span> - <span className="font-bold text-pink-600">
                      {Math.min(pagination.current_page * pagination.per_page, pagination.total_sales)}
                    </span> of <span className="font-bold text-blue-600">{pagination.total_sales}</span> sales
                  </p>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={!pagination.has_prev}
                      className="p-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-purple-600" />
                    </motion.button>

                    <div className="flex gap-2">
                      {[...Array(pagination.total_pages)].map((_, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPage(i + 1)}
                          className={`w-12 h-12 rounded-xl font-bold transition-all ${
                            pagination.current_page === i + 1
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                              : 'bg-white text-gray-700 hover:bg-purple-50'
                          }`}
                        >
                          {i + 1}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(p => p + 1)}
                      disabled={!pagination.has_next}
                      className="p-3 rounded-xl bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-purple-600" />
                    </motion.button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Sales;