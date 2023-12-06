'use client'

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
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
        <div className="group w-20 mt-1
                    border border-b-0 border-white hover:border-gray-200
                    rounded-t-md hover:shadow-md relative">
            <a href="/basket">
                {qty !== 0 && <div className="absolute h-4 w-4 rounded-full bg-sky-600 right-5
                    text-white text-xxs text-center pt-0.5">{qty}</div>}
                <Image className="m-auto" src="/basket.svg" alt="account" height={32} width={32} />
                <div className="text-xxs text-center">Basket</div>
            </a>

            <div className="group-hover:block hidden w-80 absolute bg-white
                        border border-gray-200
                        rounded-b-md rounded-tl shadow-md
                        right-[-1px] top-[51px] ">
                <div className="bg-white top-[-1px] w-[78px] h-1 absolute right-[0px]"></div>

                {items.length > 0 && <List items={items} qty={qty} />}
                {items.length === 0 && <div className="p-3">Your basket is empty</div>}
            </div>
        </div>
    )
}