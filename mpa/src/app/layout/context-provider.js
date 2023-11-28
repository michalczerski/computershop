'use client'

import { useState, createContext } from "react";
import { useCookies } from 'next-client-cookies';

export const BasketContext = createContext();

export function ContextProvider({ children }) {
    const cookies = useCookies();

    const user = cookies.get('user');

    const emptyBasket = {items: [], qty: 0}
    const basketCookie = cookies.get('basket');
    const storage = basketCookie ? JSON.parse(basketCookie) : emptyBasket;
    const [basket, setBasket] = useState({items: storage.items, qty: storage.qty});

    return (
        <BasketContext.Provider value={{ user, basket, setBasket }}>
            {children}
        </BasketContext.Provider>        
    )
}