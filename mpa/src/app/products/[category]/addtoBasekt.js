'use client'

import Link from "next/link";
import { useContext } from "react";
import { BasketContext } from "@/app/layout/context-provider";
import { useCookies } from 'next-client-cookies';

export default function AddToBasket({ product }) {
    const cookies = useCookies();
    const context = useContext(BasketContext);
    
    const handleAddToBasket = () => {
        const basket = context.basket;
        if (!basket.items.some(p => p.product._id == product._id)) {
            basket.items.push({product: product, qty: 0});
        }
        basket.items.find(p => p.product._id == product._id).qty++;
        basket.qty++;  

        const refreshedBasket = {items: basket.items, qty: basket.qty};
        context.setBasket(refreshedBasket);
        cookies.set('basket', JSON.stringify(refreshedBasket));
    }
    return (
        <Link href="" onClick={handleAddToBasket}>Add to basket</Link>
    )
}