'use client'

import { BasketContext } from "../layout/context-provider";
import { useContext, useState } from "react";
import { useFormState } from 'react-dom'
import { useCookies } from 'next-client-cookies';
import { makeOrder } from './actions';
import { SubmitButton }  from './submit';
import {productUrl} from "@/components/product";
import Image from 'next/image';

export default function List() {
    const cookies = useCookies();
    const basketContext = useContext(BasketContext);
    const basket = basketContext.basket;
    const calculateTotal = () => {
        return basketContext.basket.items.reduce((accumulator, item) => {
            return accumulator + (item.product.priceUS * item.qty);
        }, 0);
    } 
    const [total, setTotal] = useState(calculateTotal());
    const [{}, formAction] = useFormState(makeOrder, basket.items);

    const setBasket = (basket) => {
        basketContext.setBasket(basket);
        cookies.set('basket', JSON.stringify(basket)); 
        
        setTotal(calculateTotal());
    }

    const handleAdd = (item) => {
        item.qty++;
        let basket = basketContext.basket;

        setBasket({items: basket.items, qty: basket.qty + 1});       
    }

    const handleRemove = (item) => {
        item.qty--;
        if (item.qty === 0) {
            basket.items = basket.items.filter(p => p.product._id !== item.product._id);
        }
        
        setBasket({items: basket.items, qty: basket.qty - 1})
    }

    const handleRemoveAll = (item) => {
        const basket = basketContext.basket;
        basket.items = basket.items.filter(p => p.product._id !== item.product._id);

        setBasket({items: basket.items, qty: basket.qty - item.qty})
    }

    const clear = () => {
        setBasket({items: [], qty: 0})
    }

    return (
        <>
            <div className="w-3/4 flex flex-col">
                <div className="text-2xl font-medium">
                    <span className="text-black">Basket </span>
                    <span className="text-gray-500">({basket.qty})</span>
                </div>
                <ul className="border border-gray-200 rounded-md mt-5 mr-5 divide-y">
                    {basket.items.map(item => 
                        <li key={item.product._id} className="flex flex-row justify-between items-center p-3">
                            <Image src={`http://localhost:3030/images/${item.product.url}`}
                                   width={64} height={55}
                                   alt={item.product.name} />
                            <a href={productUrl(item.product)} className="flex-grow pl-3">{item.product.name}</a>
                            <div className="mr-7">{item.product.priceUS.toFixed(2)}$ </div>
                            <div className="px-2 py-1 cursor-pointer hover:bg-neutral-100 rounded-md"
                                 onClick={() => handleAdd(item)}>+</div>
                            <div className="px-1 w-5">{item.qty}</div>
                            <div className="px-2 py-1 cursor-pointer hover:bg-neutral-100 rounded-md"
                                 onClick={() => handleRemove(item)} >-</div>
                            <div className="p-1 ml-5 cursor-pointer hover:bg-neutral-100 rounded-md">
                                <Image src="/trash.svg"
                                       width={20} height={20} alt="trash"
                                       onClick={() => handleRemoveAll(item)} />
                            </div>
                        </li> )}
                </ul>  
            </div>
            <div className="w-1/4">
                    <div className="border rounded-md bg-neutral-100 p-5 flex flex-col">
                        <div className="flex flex-row justify-between">
                            <div>Total: </div>
                            <div className="font-medium">{total.toFixed(2)}$</div>
                        </div>
                        <div>
                            {basketContext.user && 
                                <form action={formAction}>
                                    <input type="hidden" 
                                        name="order" value={JSON.stringify(basket.items)} />
                                    <SubmitButton onFinish={clear}  />
                                </form>}
                            {!basketContext.user && 
                                <form action="/login">
                                    <button className="btn-p-g w-full mt-5">Login to make order</button>
                                </form>}
                        </div>
                    </div>
            </div>
        </>
    )
}