'use client'

import './basket.scss';
import { BasketContext } from "../layout/context-provider";
import { useContext, useState } from "react";
import { useFormState } from 'react-dom'
import { useCookies } from 'next-client-cookies';
import { makeOrder } from './actions';
import { SubmitButton }  from './submit';
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

    const clear = (s) => {
        setBasket({items: [], qty: 0})
    }

    return (
        <>
            <div id="list-col">
                <ul className="list">               
                    {basket.items.map(item => 
                        <li key={item.product._id}>
                            <Image src={"http://localhost:3030/images/" + item.product.url} 
                                width={64} height={55} 
                                alt={item.product.name} />
                            <div className="price-name-container">
                                <div className="name">{item.product.name}</div>
                                <div className="price">
                                        <div>{item.product.priceUS.toFixed(2)}$ </div>
                                        <div className="panel">
                                            <button onClick={() => handleAdd(item)} 
                                                className="plus">+</button>
                                            <div>{item.qty}</div>
                                            <button onClick={() => handleRemove(item)} 
                                                className="minus">-</button>

                                            <div onClick={() => handleRemoveAll(item)}>trash</div>
                                        </div>                                    
                                </div>
                            </div>

                        </li> )}
                </ul>  
            </div> 
            <div id="summary-col">
                    <div id="summary">
                        <div className="price">
                            <div>Total: </div>
                            <div>{total.toFixed(2)}$</div>
                        </div>
                        <div>
                            {basketContext.user && 
                                <form action={formAction}>
                                    <input type="hidden" 
                                        name="order" value={JSON.stringify(basket.items)} />
                                    <SubmitButton onFinish={clear}  />
                                </form>}
                            {!basketContext.user && 
                                <form action="/login"><button>Login to make order</button></form>}
                        </div>
                    </div>
            </div>
        </>
    )
}