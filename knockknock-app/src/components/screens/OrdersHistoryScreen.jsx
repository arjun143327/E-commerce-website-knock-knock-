import React from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from '../shared/BottomNav';
import { formatDateTime } from '../../utils/formatters';
import { cancelOrder } from '../../api/orderApi';

export const OrdersHistoryScreen = ({ orders, cartCount, onViewOrder }) => {
  const { setCurrentScreen, setTrackingOrderId, refreshUser } = useApp();
  const [localOrders, setLocalOrders] = React.useState(orders);

  React.useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order? Your KnockKnock wallet will be refunded immediately.')) return;
    try {
      await cancelOrder(orderId);
      // Update locally
      setLocalOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
      // Refresh wallet balance
      await refreshUser();
      alert('Order cancelled and refunded successfully.');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <div>
            <h1 className="text-2xl font-black">My Orders</h1>
            <p className="text-sm opacity-90">{localOrders.length} total orders</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-auto p-4 pb-24">
        {localOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={80} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button 
              onClick={() => setCurrentScreen('home')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {localOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-lg">Order #{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {formatDateTime(order.timestamp)}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status === 'out_for_delivery' ? 'Out for Delivery' : 
                       order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <Package size={16} />
                    <span>{order.items.length} items</span>
                    <span>•</span>
                    <span className="font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                    {order.items.slice(0, 4).map(item => (
                      <div key={item.id} className="text-3xl flex-shrink-0">
                        {item.product?.image?.startsWith('/') ? (
                           <img src={`http://localhost:3001${item.product.image}`} alt="img" className="w-10 h-10 object-cover rounded-md" />
                        ) : (
                           item.product?.image || '📦'
                        )}
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-sm text-gray-600 font-semibold">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => onViewOrder(order)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition"
                    >
                      View Details
                    </button>
                    {order.status === 'out_for_delivery' ? (
                      <button 
                        onClick={() => {
                          setTrackingOrderId(order.id);
                          setCurrentScreen('locationMap');
                        }}
                        className="flex-1 bg-blue-100 text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-200 transition"
                      >
                        Track Order
                      </button>
                    ) : order.status === 'pending' ? (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-6 bg-red-100 text-red-700 py-3 rounded-xl font-bold hover:bg-red-200 transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav cartCount={cartCount} ordersCount={localOrders.length} />
    </div>
  );
};