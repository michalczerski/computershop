'use client'

import './basket.scss';
import { BasketContext } from "../layout/context";
import { useContext, useState, useEffect } from "react";
import Image from 'next/image';

export default function List() {
    const basketContext = useContext(BasketContext);
    const [items, setItems] = useState([]);
    let [total, setTotal] = useState(0);

    useEffect(() => { 
        setItems(basketContext.basket.items);
        total = 0;
        basketContext.basket.items.map(item => { total += item.product.priceUS });
        setTotal(total)
    });

    const handleSubmit = () => {
        alert("submit")
    }

    const handleAdd = () => {
        alert("plus")
    }

    const handleRemove = () => {
        alert("remove");
    }

    return (
        <>
            <div id="list-col">
                <ul className="list">               
                    {items.map(item => 
                        <li key={item.product._id}>
                            <Image src={"http://localhost:3030/images/" + item.product.url} 
                                width={64} height={55} 
                                alt={item.product.name} />
                            <div className="price-name-container">
                                <div className="name">{item.product.name}</div>
                                <div className="price">
                                        <div>{item.product.priceUS.toFixed(2)}$ </div>
                                        <div className="panel">
                                            <button onClick={handleAdd} 
                                                className="plus">+</button>
                                            <div>{item.qty}</div>
                                            <button onClick={handleRemove} 
                                                className="minus">-</button>
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
                        <button onClick={handleSubmit}>Make order</button>
                    </div>
            </div>
        </>
    )
}