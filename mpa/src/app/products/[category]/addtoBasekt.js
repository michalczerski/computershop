'use client'

import Link from "next/link";
import { useContext } from "react";
import { BasketContext } from "@/app/layout/context";

export default function AddToBasket({ product }) {
    const context = useContext(BasketContext);
    
    const handleAddToBasket = () => {
        const basket = context.basket;
        if (!basket.items.some(p => p.product._id == product._id)) {
            basket.items.push({product: product, qty: 0});
        }
        basket.items.find(p => p.product._id == product._id).qty++;
        basket.qty++;  
        context.setBasket({items: basket.items, qty: basket.qty})
        
        window.localStorage.setItem("basket", JSON.stringify(basket));
    }
    return (
        <Link href="" onClick={handleAddToBasket}>Add to basket</Link>
    )
}