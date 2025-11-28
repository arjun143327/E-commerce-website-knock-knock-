// orderChannel.js - Use this EXACT file in BOTH apps
// Location: src/orderChannel.js (or src/utils/orderChannel.js)

class OrderChannel {
    constructor() {
        this.channel = new BroadcastChannel('knockknock-orders');
        this.listeners = [];
        
        // Listen to messages
        this.channel.onmessage = (event) => {
            console.log('📡 Received message:', event.data);
            this.listeners.forEach(listener => listener(event.data));
        };
    }

    // Send new order from customer app
    sendNewOrder(order) {
        const message = {
            type: 'NEW_ORDER',
            payload: order,
            timestamp: new Date().toISOString()
        };
        console.log('📤 Sending order:', message);
        this.channel.postMessage(message);
    }

    // Update order status from retailer app
    updateOrderStatus(orderId, status) {
        const message = {
            type: 'ORDER_STATUS_UPDATE',
            payload: { orderId, status },
            timestamp: new Date().toISOString()
        };
        console.log('📤 Updating status:', message);
        this.channel.postMessage(message);
    }

    // Subscribe to messages
    onMessage(callback) {
        this.listeners.push(callback);
        return callback; // Return for cleanup
    }

    // Unsubscribe
    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    // Close channel
    close() {
        this.channel.close();
    }
}

// Export singleton instance
export const orderChannel = new OrderChannel();