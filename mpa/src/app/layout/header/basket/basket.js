'use client'

import { useContext, useEffect, useState } from "react";

import './basket.scss'
import List from './list';
import { BasketContext } from "../../context-provider";

export default function Basket() {
    const basketContext = useContext(BasketContext);
    const [qty, setQty] = useState(basketContext.basket.qty);
    const [items, setItems] = useState(basketContext.basket.items);

    useEffect(() => { 
        setQty(basketContext.basket.qty);
        setItems(basketContext.basket.items);
    });

    return (
        <a  href="/basket" className="basket">
            BASKET ({qty})
            <List items={items}/>
        </a>
    )
}