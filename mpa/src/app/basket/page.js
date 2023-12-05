'use client'

import List from './list';
import Empty from './empty';
import { BasketContext } from "../layout/context-provider";
import { useContext, useState, useEffect } from "react";


export default function Basket() {
    const basketContext = useContext(BasketContext);
    const [items, setItems] = useState(basketContext.basket.items);

    useEffect(() => { setItems(basketContext.basket.items) });

    return (
        <>
            <div className="flex flex-row w-full">
                {items.length === 0 && <Empty />}
                {items.length > 0 && <List />}
            </div>
        </>
    )
}