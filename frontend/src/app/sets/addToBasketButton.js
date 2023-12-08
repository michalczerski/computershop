'use client'

import {useCookies} from "next-client-cookies";
import {useContext} from "react";
import {Context} from "@/app/context";
import {addToBasket} from "@/components/product";

export default function AddToBasketButton({computer}) {
    const cookies = useCookies();
    const context = useContext(Context);
    const total = Object.keys(computer).reduce((acc, part) => acc += computer[part].priceUS, 0);

    const handleAddToBasket = () => {
        Object.keys(computer).map(name => {
            addToBasket(context, cookies, computer[name]);
        });
    }

    return (
        <div className="mt-3 w-full flex justify-between">
            <div className="text-lg font-extralight">{total.toFixed(2)}$</div>
            <button className="btn-p-g" onClick={handleAddToBasket}>
                Add to basket
            </button>
        </div>
    )
}