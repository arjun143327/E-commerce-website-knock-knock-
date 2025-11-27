import { useState, useEffect } from 'react';

export const useOrderTracking = (isActive) => {
  const [orderStatus, setOrderStatus] = useState(1);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(720); // 12 minutes

  useEffect(() => {
    if (!isActive) return;

    // Status progression
    const statusInterval = setInterval(() => {
      setOrderStatus(prev => {
        if (prev < 4) return prev + 1;
        clearInterval(statusInterval);
        return prev;
      });
    }, 8000);

    // Progress bar
    const progressInterval = setInterval(() => {
      setDeliveryProgress(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(progressInterval);
        return 100;
      });
    }, 120);

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev > 0 && orderStatus < 4) return prev - 1;
        if (orderStatus >= 4) clearInterval(timerInterval);
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
      clearInterval(timerInterval);
    };
  }, [isActive, orderStatus]);

  const reset = () => {
    setOrderStatus(1);
    setDeliveryProgress(0);
    setTimeRemaining(720);
  };

  return {
    orderStatus,
    deliveryProgress,
    timeRemaining,
    reset
  };
};