'use client'

import {useState} from "react";
import {useCookies} from 'next-client-cookies';
import {Context} from  '@/app/context';
import {useUser} from "@/components/hooks/user-client";

export function ContextProvider({ children }) {
    const [,user] = useUser();
    const cookies = useCookies();
    const emptyBasket = {items: [], qty: 0}
    const basketCookie = cookies.get('basket');
    const storage = basketCookie ? JSON.parse(basketCookie) : emptyBasket;
    const [basket, setBasket] = useState({items: storage.items, qty: storage.qty});

    return (
        <Context.Provider value={{ user, basket, setBasket }}>
            {children}
        </Context.Provider>
    )
}