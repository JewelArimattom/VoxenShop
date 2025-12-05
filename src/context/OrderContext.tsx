"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  getOrdersByUser: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    setIsLoaded(true);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const addOrder = (orderData: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((currentOrders) => [...currentOrders, newOrder]);
    return newOrder;
  };

  const getOrdersByUser = (userId: string): Order[] => {
    return orders.filter((order) => order.userId === userId);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrdersByUser }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
