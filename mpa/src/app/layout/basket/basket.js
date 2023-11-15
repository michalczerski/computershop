'use client'

import './basket.scss'
import { BasketContext } from "../context";
import { useContext, useEffect, useState } from "react";

import List from './list';

export default function Basket() {
    const basketContext = useContext(BasketContext);
    const [qty, setQty] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => { 
        setQty(basketContext.basket.qty);
        setItems(basketContext.basket.items);
    });


    return (
        <a  href="/basket" className="basket" suppressHydrationWarning={true}>
            BASKET ({qty})
            <List items={items}/>
        </a>
    )
}