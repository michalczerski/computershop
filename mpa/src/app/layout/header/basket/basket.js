'use client'

import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { BasketContext } from "../../context-provider";

export default function Basket() {
    const basketContext = useContext(BasketContext);
    const [qty, setQty] = useState(basketContext.basket.qty);
    const [items, setItems] = useState(basketContext.basket.items);
    const total = items.reduce((acc, item) => acc += item.product.priceUS * item.qty, 0);

    useEffect(() => { 
        setQty(basketContext.basket.qty);
        setItems(basketContext.basket.items);
    });

    return (
        <div className="group w-20 mt-1
                    border border-b-0 border-white hover:border-gray-200
                    rounded-t-md hover:shadow-md relative">
            <a href="/basket">
                {qty != 0 && <div className="absolute h-4 w-4 rounded-full bg-sky-600 right-5
                    text-white text-xxs text-center pt-0.5">{qty}</div>}
                <Image className="m-auto" src="/basket.svg" alt="account" height={32} width={32} />
                <div className="text-xxs text-center">Basket</div>
            </a>

            <div className="group-hover:block hidden w-80 absolute bg-white
                        border border-gray-200
                        rounded-b-md rounded-tl shadow-md
                        flex flex-row items-center
                        right-[-1px] top-[51px] ">
                <div className="bg-white top-[-1px] w-[78px] h-1 absolute right-[0px]"></div>

                <div className="border-b">
                    <div className="py-2 px-4 font-medium text-base">
                        <span className="text-black">Basket </span>
                        <span className="text-gray-500">({qty})</span>
                    </div>
                </div>

                <ul className="pt-4">
                    {items.map(item =>
                        <li key={item.product._id} className="">
                            <div className="flex flex-row pb-7 px-4 w-full ">
                                <Image src={`http://localhost:3030/images/${item.product.url}`}
                                       height={64} width={64} alt={item.product.name} />
                                <div className="flex flex-col pl-2 justify-between w-full">
                                    <div className="text-xs">{item.product.name}</div>
                                    <div className="flex flex-row w-full justify-between">
                                        <div className="text-sm text-gray-500">
                                            {item.qty} {item.qty > 1 ? 'pieces' : 'piece'}
                                        </div>
                                        <div className="text-sm">{item.product.priceUS.toFixed(2)}$</div>
                                    </div>
                                </div>
                            </div>
                        </li> )}
                </ul>

                <div className="bg-neutral-100 px-4 py-3 rounded-md flex flex-col">
                    <div className="flex flex-row w-full justify-between">
                        <div>Total</div>
                        <div className="font-semibold">{total.toFixed(2)}$</div>
                    </div>
                    <a href="/basket" className="btn-p-g mt-3">Basket</a>
                </div>

            </div>
        </div>
    )
}