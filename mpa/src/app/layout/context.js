'use client'

import { useState, createContext, useMemo } from "react";
export const BasketContext = createContext();

export function Context({ children }) {
    let storage = {};
    useMemo(() => {
        if (typeof window !== "undefined") {
            const productsJson = window.localStorage.getItem("basket") ?? '{"items": [], "qty": 0}';
            storage = JSON.parse(productsJson);
        }
    });
    const [basket, setBasket] = useState({items: storage.items, qty: storage.qty});
  
    return (
        <BasketContext.Provider value={{ basket, setBasket }}>
            {children}
        </BasketContext.Provider>            
    )
}