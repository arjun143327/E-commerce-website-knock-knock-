import React, { useState } from 'react';
import { 
    Store, Package, ShoppingBag, BarChart3, 
    Settings, Bell, CheckCircle, 
    XCircle, Clock, ChevronRight, 
    LogOut, TrendingUp, Zap, MapPin
} from 'lucide-react';
import { useEffect } from 'react';
import { orderChannel } from './orderChannel';

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
    { id: 1, name: "iPhone 15 Pro", price: 134900, mrp: 144900, storeId: 1, inStock: true, category: "Electronics", image: "📱", rating: 4.8, orders: 12 },
    { id: 2, name: "Samsung Galaxy S24", price: 79999, mrp: 89999, storeId: 1, inStock: true, category: "Electronics", image: "📱", rating: 4.6, orders: 8 },
    { id: 6, name: "Sony Headphones", price: 8999, mrp: 12999, storeId: 1, inStock: false, category: "Electronics", image: "🎧", rating: 4.4, orders: 5 },
    { id: 7, name: "AirPods Pro", price: 24999, mrp: 27900, storeId: 1, inStock: true, category: "Electronics", image: "🎧", rating: 4.9, orders: 22 },
];

// --- SUB-COMPONENTS ---

const RevenueChart = () => {
    const data = [40, 65, 45, 80, 55, 90, 70];
    const max = Math.max(...data);
    
    return (
        <div className="w-full h-48 flex items-end justify-between gap-2 pt-4 px-2">
            {data.map((val, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                    <div className="relative w-full flex items-end justify-center h-40">
                        <div 
                            className="w-full max-w-[20px] bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                            style={{ height: `${(val / max) * 100}%` }}
                        ></div>
                        <div className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹{val}k
                        </div>
                    </div>
                    <span className="text-xs text-gray-400 mt-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                </div>
            ))}
        </div>
    );
};

const NotificationToast = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-in">
            <div className="bg-white rounded-xl shadow-2xl border-l-4 border-purple-600 p-4 flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <Bell size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-800">New Order Received! #{notification.id}</h4>
                    <p className="text-sm text-gray-600">₹{notification.total.toLocaleString()} • {notification.items.length} Items</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.customer}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XCircle size={20} />
                </button>
            </div>
        </div>
    );
};

const LoginScreen = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onLogin();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-md p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="bg-white/20 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4 text-4xl shadow-lg">
                        🏪
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Partner Login</h1>
                    <p className="text-blue-200">Manage your store on Knock Knock</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-white/80 text-sm ml-1 mb-1 block">Phone Number</label>
                        <input 
                            type="tel" 
                            defaultValue="9876543210"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <div>
                        <label className="text-white/80 text-sm ml-1 mb-1 block">Store ID / PIN</label>
                        <input 
                            type="password" 
                            defaultValue="1234"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        ) : (
                            <>Login to Dashboard <ChevronRight size={18} /></>
                        )}
                    </button>
                </form>
                
                <div className="mt-8 text-center text-white/50 text-xs">
                    <p>Hyperlocal Delivery Partner App v1.0</p>
                    <p>Avadi, Chennai</p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState(MOCK_PRODUCTS);
    const [notification, setNotification] = useState(null);
    const [isStoreOpen, setIsStoreOpen] = useState(true);

    // 🔥 CALCULATE ACTIVE AND COMPLETED ORDERS
    const activeOrders = orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status));
    const completedOrders = orders.filter(o => ['completed', 'rejected'].includes(o.status));

    // 🔥 LISTEN FOR INCOMING ORDERS FROM CUSTOMER APP
    useEffect(() => {
        console.log('🎧 Retailer app listening for orders...');
        
        const listener = orderChannel.onMessage((message) => {
            console.log('📩 Retailer received:', message);
            
            if (message.type === 'NEW_ORDER') {
                const newOrder = message.payload;
                
                // Add to orders
                setOrders(prev => [newOrder, ...prev]);
                
                // Show notification
                setNotification(newOrder);
                
                // Auto hide after 5 seconds
                setTimeout(() => setNotification(null), 5000);
            }
            
            if (message.type === 'ORDER_STATUS_UPDATE') {
                const { orderId, status } = message.payload;
                setOrders(prev => prev.map(o => 
                    o.id === orderId ? { ...o, status } : o
                ));
            }
        });

        return () => {
            console.log('🔇 Cleaning up listener');
            orderChannel.removeListener(listener);
        };
    }, []);

    // 🔥 SIMULATE INCOMING ORDER (FOR DEMO BUTTON)
    const simulateIncomingOrder = () => {
        const randomItem = inventory[Math.floor(Math.random() * inventory.length)];
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            customer: ["Rahul K.", "Priya S.", "Amit B.", "Sneha R."][Math.floor(Math.random() * 4)],
            items: [
                { ...randomItem, qty: 1 },
                ...(Math.random() > 0.5 ? [{ ...inventory[0], qty: 1 }] : [])
            ],
            total: randomItem.price + (Math.random() > 0.5 ? inventory[0].price : 0),
            status: 'pending',
            time: new Date(),
            address: "12, Gandhi Road, Avadi",
            payment: "UPI"
        };

        setOrders(prev => [newOrder, ...prev]);
        setNotification(newOrder);
        setTimeout(() => setNotification(null), 4000);
    };

    // 🔥 UPDATE ORDER STATUS
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        orderChannel.updateOrderStatus(orderId, newStatus);
    };

    // 🔥 TOGGLE STOCK
    const toggleStock = (productId) => {
        setInventory(inventory.map(p => 
            p.id === productId ? { ...p, inStock: !p.inStock } : p
        ));
    };

    // 🔥 RENDER STATUS BADGE
    const renderStatusBadge = (status) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
            preparing: "bg-blue-100 text-blue-700 border-blue-200",
            ready: "bg-purple-100 text-purple-700 border-purple-200",
            completed: "bg-green-100 text-green-700 border-green-200",
            rejected: "bg-red-100 text-red-700 border-red-200"
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]} uppercase tracking-wider`}>
                {status}
            </span>
        );
    };

    if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

    return (
        <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
            
            {/* HEADER */}
            <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10 sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                        🏪
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 leading-tight">Tech Galaxy</h2>
                        <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                            <span className="text-xs text-gray-500">{isStoreOpen ? 'Online' : 'Closed'}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={simulateIncomingOrder}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200 transition-colors flex items-center gap-1"
                        title="Click to Simulate Customer Order"
                    >
                        <Bell size={12} className={notification ? "animate-bounce" : ""} />
                        Demo
                    </button>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* NOTIFICATION */}
            <NotificationToast notification={notification} onClose={() => setNotification(null)} />

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
                
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                    <div className="p-4 space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-gray-500 text-sm">Good Evening,</p>
                                <h1 className="text-2xl font-bold text-gray-800">Ramesh Kumar</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-xs">Today's Revenue</p>
                                <p className="text-xl font-bold text-green-600">₹14,500</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-2 text-purple-600">
                                    <ShoppingBag size={20} />
                                    <span className="text-sm font-semibold">Orders</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{activeOrders.length + 12}</p>
                                <p className="text-xs text-green-500 flex items-center gap-1">
                                    <TrendingUp size={12} /> +15% vs yest.
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-2 text-blue-600">
                                    <Clock size={20} />
                                    <span className="text-sm font-semibold">Avg Time</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">12m</p>
                                <p className="text-xs text-green-500">On Target</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-gray-800">Weekly Performance</h3>
                                <select className="text-xs bg-gray-100 rounded px-2 py-1 border-none outline-none text-gray-600">
                                    <option>Revenue</option>
                                    <option>Orders</option>
                                </select>
                            </div>
                            <RevenueChart />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-3">Live Feed</h3>
                            <div className="space-y-3">
                                {[1,2,3].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-50">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">Order #{2024 - i} Delivered</p>
                                            <p className="text-xs text-gray-500">{i * 15 + 5} mins ago</p>
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">₹899</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold text-gray-800">Active Orders</h2>
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">{activeOrders.length} Pending</span>
                        </div>

                        {activeOrders.length === 0 ? (
                            <div className="text-center py-20 opacity-50">
                                <div className="text-6xl mb-4">💤</div>
                                <p className="font-medium text-gray-600">No active orders</p>
                                <p className="text-xs text-gray-400 mt-2">Waiting for orders from customers...</p>
                                <button onClick={simulateIncomingOrder} className="mt-6 text-indigo-500 underline text-sm">Click to simulate an order</button>
                            </div>
                        ) : (
                            activeOrders.map(order => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-md border-l-4 border-l-purple-500 overflow-hidden">
                                    <div className="p-4 border-b border-gray-50 flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-lg text-gray-800">#{order.id}</h3>
                                                {renderStatusBadge(order.status)}
                                            </div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock size={12} /> {order.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                <span className="mx-1">•</span>
                                                <span className="text-green-600 font-medium">{order.payment}</span>
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-xl text-gray-800">₹{order.total.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">Total Bill</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Items to Pack</p>
                                        <ul className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between text-sm text-gray-700">
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-5 h-5 bg-white rounded flex items-center justify-center text-xs border">{item.image}</span>
                                                        {item.qty}x {item.name}
                                                    </span>
                                                    <span className="text-gray-500">₹{item.price.toLocaleString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="px-4 py-2 bg-white flex items-center gap-2 text-xs text-gray-500 border-t border-gray-50">
                                        <MapPin size={12} /> {order.address}
                                    </div>

                                    <div className="p-4 pt-2 flex gap-3">
                                        {order.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => updateOrderStatus(order.id, 'rejected')}
                                                    className="flex-1 py-3 border border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                                <button 
                                                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                    className="flex-[2] py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
                                                >
                                                    Accept Order
                                                </button>
                                            </>
                                        )}
                                        {order.status === 'preparing' && (
                                            <button 
                                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Package size={20} /> Mark Ready for Pickup
                                            </button>
                                        )}
                                        {order.status === 'ready' && (
                                            <div className="w-full text-center py-2 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-200 animate-pulse">
                                                Waiting for Delivery Partner...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <h3 className="font-bold text-gray-500 mb-4">Past Orders</h3>
                            {completedOrders.length > 0 ? (
                                completedOrders.map(order => (
                                    <div key={order.id} className="flex items-center justify-between p-3 bg-white mb-2 rounded-lg opacity-60">
                                        <span className="font-bold text-gray-600">#{order.id}</span>
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{order.status}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400">No history yet.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* INVENTORY TAB */}
                {activeTab === 'inventory' && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Inventory</h2>
                        <div className="space-y-4">
                            {inventory.map(product => (
                                <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                            {product.image}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                                            <p className="text-xs text-gray-500">MRP: ₹{product.mrp.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="text-sm font-bold text-purple-600">₹{product.price.toLocaleString()}</div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={product.inStock}
                                                onChange={() => toggleStock(product.id)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                            <span className="ml-2 text-xs font-medium text-gray-900">
                                                {product.inStock ? 'In Stock' : 'OOS'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex items-start gap-3">
                                <Zap className="text-blue-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-blue-800 text-sm">SmartSync™ Enabled</h4>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Your inventory is automatically syncing with your POS system. Last sync: 2 mins ago.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* BOTTOM NAVIGATION */}
            <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-20 absolute bottom-0 w-full">
                <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'}`}
                >
                    <BarChart3 size={24} className={activeTab === 'dashboard' ? 'fill-current opacity-20' : ''} />
                    <span className="text-[10px] font-medium">Dashboard</span>
                </button>
                
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex flex-col items-center gap-1 transition-colors relative ${activeTab === 'orders' ? 'text-purple-600' : 'text-gray-400'}`}
                >
                    {activeOrders.length > 0 && (
                        <span className="absolute -top-1 right-2 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full animate-bounce">
                            {activeOrders.length}
                        </span>
                    )}
                    <div className={`p-1 rounded-full ${activeTab === 'orders' ? 'bg-purple-100' : ''}`}>
                        <Store size={24} />
                    </div>
                    <span className="text-[10px] font-medium">Orders</span>
                </button>
                
                <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'inventory' ? 'text-purple-600' : 'text-gray-400'}`}
                >
                    <Package size={24} />
                    <span className="text-[10px] font-medium">Inventory</span>
                </button>
                
                <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <LogOut size={24} />
                    <span className="text-[10px] font-medium">Logout</span>
                </button>
            </nav>

        </div>
    );
}