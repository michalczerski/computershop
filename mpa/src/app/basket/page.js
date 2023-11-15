'use client'

import './basket.scss';
import List from './list';
import Empty from './empty';
import { BasketContext } from "../layout/context";
import { useContext, useState, useEffect } from "react";

export default function Basket() {
    const basketContext = useContext(BasketContext);
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { 
        setLoaded(true);
        setItems(basketContext.basket.items);
    });

    return (
        <>
            <div id="basket-page">
                {!loaded && <div>Loading...</div>}
                {loaded && items.length == 0 && <Empty />}
                {loaded && items.length > 0 && <List />}
            </div>
        </>
    )
}