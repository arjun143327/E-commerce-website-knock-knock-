export const formatPrice = (price) => {
  return `₹${price.toLocaleString()}`;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
};

export const calculateSavings = (mrp, price, quantity = 1) => {
  return (mrp - price) * quantity;
};

export const generateOrderId = () => {
  return `KK${Date.now()}`;
};